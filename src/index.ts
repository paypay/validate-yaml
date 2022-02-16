import * as core from '@actions/core'
import {Validator} from './lib/validate'
import fs from 'fs'

async function run(): Promise<void> {
  try {
    const logFile = 'validator.log'
    const validator = new Validator({
      files: core.getMultilineInput('files'),
      schemaPath: core.getInput('schemaPath'),
      validatorLog: logFile
    })
    const failure: boolean =
      (core.getInput('allow_failure') || 'false').toUpperCase() === 'TRUE'

    const inValidFilesCount = await validator.ValidateYAML()
    const validatorLog = fs.readFileSync(logFile, {encoding: 'utf-8'})
    core.info(validatorLog)

    if (inValidFilesCount === 0) {
      core.info('🎉 All files successfully validated')
    } else {
      if (failure) {
        core.setFailed('❗Validation error(s)')
      } else {
        core.info('❗Validation error(s)')
      }
    }
    core.setOutput('inValid_files_count', inValidFilesCount)
  } catch (error) {
    core.setFailed((error as Error).message)
  }
}

run()
