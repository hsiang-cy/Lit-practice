/*
 * @Author:Kerwin
 * @Date:2024-04-14 13:36:10
 * @LastEditors:Kerwin
 * @LastEditTime:2025-03-27 17:34:11
 * @Description:
 */

import {
  Module
} from '@nestjs/common'

import GetCalculateJobRoute from './6000.get-calculate-job-route'
import GetCalculateJobRouteTask from './6001.get-calculate-job-route-task'
import SearchDropDestination from './6002.search-drop-destination'
import GetCalculateJobRoutePath from './6003.get-calculate-job-route-path'
import SearchCalculateJob from './6004.search-calculate-job'
import SearchCalculateJobState from './6005.search-calculate-job-state'

const operators = [
  SearchDropDestination,
  SearchCalculateJob,
  SearchCalculateJobState,
  GetCalculateJobRoute,
  GetCalculateJobRouteTask,
  GetCalculateJobRoutePath
]

export {
  SearchDropDestination,
  SearchCalculateJob,
  SearchCalculateJobState,
  GetCalculateJobRoute,
  GetCalculateJobRouteTask,
  GetCalculateJobRoutePath
}

@Module({
  providers: [
    // -- operator
    ...operators
  ],
  exports: [
    ...operators
  ]
})
export class OperatorModule { }
