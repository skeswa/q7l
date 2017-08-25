const glob = require('glob-promise')
const { close, mkdir, open, readFile, writeFile } = require('mz/fs')
const { EOL } = require('os')
const { join } = require('path')

const defaultOpts = {
  fakeTypeFileContents: `/* tslint:disable */
// THIS FILE WAS GENERATED BY THE TYPE FAKER WEBPACK PLUGIN IN ORDER TO MAKE
// THIS FILE'S NAMESAKE IMPORTABLE IN TYPESCRIPT. FEEL FREE TO OVERWRITE
// THIS FILE WITH BONA FIDE TYPING METADATA.

export type ThisTypeIsAPlaceholder = any;

/* tslint:enable */
`,
  fileExtensions: ['css', 'gql'],
  sourceDirPath: join(__dirname, '..', '..', 'src'),
  verbose: true,
}

/**
 * Webpack plugin that generates fake type files for non-typescript assets in
 * order to keep tsc from complaining unnecessarily.
 */
class TypeFakerPlugin {
  constructor(opts = {}) {
    const optsWithDefaults = Object.assign({}, defaultOpts, opts)

    this.fileExtensions = optsWithDefaults.fileExtensions
    this.sourceDirPath = optsWithDefaults.sourceDirPath
    this.fakeTypeFileContents = optsWithDefaults.fakeTypeFileContents
    this.verbose = optsWithDefaults.verbose
  }

  apply(compiler) {
    const onRun = (_, callback) =>
      this.generateFakeTypeFiles()
        .then(() => callback())
        .catch(err => callback(err))

    const onEmit = (compilation, callback) => {
      this.generateFakeTypeFiles(compilation)
        .then(() => callback())
        .catch(err => callback(err))
    }

    compiler.plugin('run', onRun)
    compiler.plugin('watch-run', onRun)
    compiler.plugin('emit', onEmit)
  }

  /**
   * Creates a new fake type file at the specified path, and then informs
   * webpack of the new file.
   * @param {string} filePath path of fake type file to create.
   * @param {Compilation} compilation the current webpack compilation instance.
   */
  async createFakeTypeFile(filePath, compilation) {
    try {
      // Create the fake type file.
      await writeFile(filePath, this.fakeTypeFileContents)

      if (this.verbose) {
        console.log(`Created new type file at path "${filePath}".`)
      }

      // Then tell webpack about it.
      if (compilation) {
        compilation.assets[filePath] = {
          source: () => this.fakeTypeFileContents,
          size: () => this.fakeTypeFileContents.length,
        }
      }
    } catch (err) {
      throw this.newError(
        `Failed to create new type file at path "${filePath}"`,
        err
      )
    }
  }

  /**
   * Returns true if a file at the specified path exists.
   * @param {string} filePath path of file to check.
   * @return {Promise<boolean>} true if a file at the specified path exists.
   */
  async doesFileExist(filePath) {
    try {
      const fd = await open(filePath, 'r' /* open for reading */)

      // Dispose of the file descriptor since we now know that the file exists.
      await close(fd)
    } catch ({ code }) {
      // This error code means that `filePath` does not exist.
      if (code === 'ENOENT') return false
    }

    // If we got this far, then the file does exist.
    return true
  }

  /**
   * Generates fake type files for source files with missing typings.
   * @param {Compilation} compilation the current webpack compilation instance.
   */
  async generateFakeTypeFiles(compilation) {
    if (this.verbose) {
      console.log(
        `Filtering filesystem for files with extensions ` +
          `matching ${this.fileExtensions}`
      )
    }

    // Find all relevant source files.
    const listOfListOfPaths = await Promise.all(
      this.fileExtensions
        .map(extension => join(this.sourceDirPath, '**', `*.${extension}`))
        .map(globPath => glob(globPath))
    )

    // Flatten join all of the list of paths into one big list of paths.
    const listOfPaths = Array.prototype.concat.apply([], listOfListOfPaths)

    // Get all the type file info for each file in the source directory that
    // matches the specified file extensions.
    const typeFileInfo = await Promise.all(
      listOfPaths.map(sourceFilePath => this.typeFileInfoFor(sourceFilePath))
    )

    if (this.verbose) {
      console.log(
        `Found ${typeFileInfo.length} files with the extensions ` +
          `${this.fileExtensions}.`
      )
    }

    // Isolate just the missing type files from all the typeFileInfo.
    const missingTypeFilePaths = typeFileInfo
      .filter(({ typeFileExists }) => !typeFileExists)
      .map(({ typeFilePath }) => typeFilePath)

    if (this.verbose) {
      console.log(
        `Found ${missingTypeFilePaths.length} files with extensions ${this
          .fileExtensions} ` + `that need typings to be generated.`
      )
    }

    // Exit early if there are no missing ype file paths.
    if (missingTypeFilePaths.length < 1) return

    try {
      // Create type files for all the missing type file paths in parallel.
      await Promise.all(
        missingTypeFilePaths.map(missingTypeFilePath =>
          this.createFakeTypeFile(missingTypeFilePath, compilation)
        )
      )
    } catch (err) {
      throw this.newError(
        'Failed to generate typings for all applicable files',
        err
      )
    }
  }

  /**
   * Creates a new Error with an optional cause.
   * 
   * @param {string} message text describing what failed.
   * @param {Error} cause Error that caused this one.
   * @return {Error} new Error that includes message and cause.
   */
  newError(message, cause) {
    if (!cause) {
      return new Error(message)
    }

    const err = new Error(`${message}: ${cause.message}`)
    err.stack += `

Caused by: ${cause.stack}`
    return err
  }

  /**
   * Returns info about the type file that corresponds to the specified
   * source file.
   * 
   * @param {string} sourceFilePath path to the source file.
   * @return {Promise<Object>} object with the source file path, type file
   *     path, and a boolean flag representing whether the type file exists.
   */
  async typeFileInfoFor(sourceFilePath) {
    const typeFilePath = `${sourceFilePath}.d.ts`

    return {
      sourceFilePath,
      typeFilePath,

      typeFileExists: await this.doesFileExist(typeFilePath),
    }
  }
}

module.exports = TypeFakerPlugin