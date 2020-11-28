/**
 * @typedef {object} ActivityCategory
 * @property {string} [$type]
*/
/**
 * @typedef {object} ActivityCursorPage
 * @property {boolean} [reverse]
 * @property {string} [beforeCursor]
 * @property {string} [afterCursor]
 * @property {boolean} [hasBefore]
 * @property {boolean} [hasAfter]
 * @property {ActivityItem} [activities]
 * @property {string} [$type]
*/
/**
 * @typedef {object} ActivityItem
 * @property {string} [$type]
*/
/**
 * @typedef {object} Agile
 * @property {string} [name]
 * @property {User} [owner]
 * @property {UserGroup} [visibleFor]
 * @property {boolean} [visibleForProjectBased]
 * @property {UserGroup} [updateableBy]
 * @property {boolean} [updateableByProjectBased]
 * @property {boolean} [orphansAtTheTop]
 * @property {boolean} [hideOrphansSwimlane]
 * @property {CustomField} [estimationField]
 * @property {CustomField} [originalEstimationField]
 * @property {Array<Project>} [projects]
 * @property {Array<Sprint>} [sprints]
 * @property {Sprint} [currentSprint]
 * @property {ColumnSettings} [columnSettings]
 * @property {SwimlaneSettings} [swimlaneSettings]
 * @property {SprintsSettings} [sprintsSettings]
 * @property {ColorCoding} [colorCoding]
 * @property {AgileStatus} [status]
 * @property {string} [$type]
*/
/**
 * @typedef {object} AgileColumn
 * @property {string} [presentation]
 * @property {boolean} [isResolved]
 * @property {number} [ordinal]
 * @property {ColumnSettings} [parent]
 * @property {WIPLimit} [wipLimit]
 * @property {Array<AgileColumnFieldValue>} [fieldValues]
 * @property {string} [$type]
*/
/**
 * @typedef {(DatabaseAttributeValue|object)} AgileColumnFieldValue
*/
/**
 * @typedef {object} AgileStatus
 * @property {boolean} [valid]
 * @property {boolean} [hasJobs]
 * @property {string} [errors]
 * @property {string} [warnings]
 * @property {string} [$type]
*/
/**
 * @typedef {object} AppearanceSettings
 * @property {TimeZoneDescriptor} [timeZone]
 * @property {DateFormatDescriptor} [dateFieldFormat]
 * @property {Logo} [logo]
 * @property {string} [$type]
*/
/**
 * @typedef {(CreatedDeletedActivityItem|object)} AttachmentActivityItem
*/
/**
 * @typedef {(SwimlaneSettings|object)} AttributeBasedSwimlaneSettings
*/
/**
 * @typedef {object} BackupError
 * @property {number} [date]
 * @property {string} [errorMessage]
 * @property {string} [$type]
*/
/**
 * @typedef {object} BackupFile
 * @property {string} [name]
 * @property {number} [size]
 * @property {number} [creationDate]
 * @property {string} [link]
 * @property {string} [$type]
*/
/**
 * @typedef {object} BackupStatus
 * @property {boolean} [backupInProgress]
 * @property {boolean} [backupCancelled]
 * @property {BackupError} [backupError]
 * @property {string} [$type]
*/
/**
 * @typedef {(Bundle)} BaseBundle
*/
/**
 * @typedef {(BaseBundle|object)} BuildBundle
*/
/**
 * @typedef {(BundleCustomFieldDefaults|object)} BuildBundleCustomFieldDefaults
*/
/**
 * @typedef {(BundleElement|object)} BuildBundleElement
*/
/**
 * @typedef {(BundleProjectCustomField|object)} BuildProjectCustomField
*/
/**
 * @typedef {object} Bundle
 * @property {boolean} [isUpdateable]
 * @property {string} [$type]
*/
/**
 * @typedef {(CustomFieldDefaults)} BundleCustomFieldDefaults
*/
/**
 * @typedef {object} BundleElement
 * @property {string} [name]
 * @property {Bundle} [bundle]
 * @property {string} [description]
 * @property {number} [ordinal]
 * @property {FieldStyle} [color]
 * @property {boolean} [hasRunningJob]
 * @property {string} [$type]
*/
/**
 * @typedef {(ProjectCustomField)} BundleProjectCustomField
*/
/**
 * @typedef {object} ColorCoding
 * @property {string} [$type]
*/
/**
 * @typedef {object} ColumnSettings
 * @property {CustomField} [field]
 * @property {Array<AgileColumn>} [columns]
 * @property {string} [$type]
*/
/**
 * @typedef {(CommandVisibility|object)} CommandLimitedVisibility
*/
/**
 * @typedef {object} CommandList
 * @property {string} [comment]
 * @property {CommandVisibility} [visibility]
 * @property {string} [query]
 * @property {number} [caret]
 * @property {boolean} [silent]
 * @property {boolean} [usesMarkdown]
 * @property {string} [runAs]
 * @property {Array<ParsedCommand>} [commands]
 * @property {Array<Issue>} [issues]
 * @property {Array<Suggestion>} [suggestions]
 * @property {string} [$type]
*/
/**
 * @typedef {(CommandVisibility)} CommandUnlimitedVisibility
*/
/**
 * @typedef {object} CommandVisibility
 * @property {string} [$type]
*/
/**
 * @typedef {(CreatedDeletedActivityItem|object)} CommentActivityItem
*/
/**
 * @typedef {(MultiValueActivityItem|object)} CommentAttachmentsActivityItem
*/
/**
 * @typedef {(ActivityItem)} CreatedDeletedActivityItem
*/
/**
 * @typedef {object} CustomField
 * @property {string} [name]
 * @property {string} [localizedName]
 * @property {FieldType} [fieldType]
 * @property {boolean} [isAutoAttached]
 * @property {boolean} [isDisplayedInIssueList]
 * @property {number} [ordinal]
 * @property {string} [aliases]
 * @property {CustomFieldDefaults} [fieldDefaults]
 * @property {boolean} [hasRunningJob]
 * @property {boolean} [isUpdateable]
 * @property {Array<ProjectCustomField>} [instances]
 * @property {string} [$type]
*/
/**
 * @typedef {(ActivityItem|object)} CustomFieldActivityItem
*/
/**
 * @typedef {object} CustomFieldDefaults
 * @property {boolean} [canBeEmpty]
 * @property {string} [emptyFieldText]
 * @property {boolean} [isPublic]
 * @property {CustomField} [parent]
 * @property {string} [$type]
*/
/**
 * @typedef {(FilterField|object)} CustomFilterField
*/
/**
 * @typedef {object} DatabaseAttributeValue
 * @property {string} [$type]
*/
/**
 * @typedef {object} DatabaseBackupSettings
 * @property {string} [location]
 * @property {number} [filesToKeep]
 * @property {string} [cronExpression]
 * @property {string} [archiveFormat]
 * @property {boolean} [isOn]
 * @property {number} [availableDiskSpace]
 * @property {Array<User>} [notifiedUsers]
 * @property {BackupStatus} [backupStatus]
 * @property {string} [$type]
*/
/**
 * @typedef {object} DateFormatDescriptor
 * @property {string} [presentation]
 * @property {string} [pattern]
 * @property {string} [datePattern]
 * @property {string} [$type]
*/
/**
 * @typedef {(SimpleIssueCustomField|object)} DateIssueCustomField
*/
/**
 * @typedef {object} DuplicateVote
 * @property {Issue} [issue]
 * @property {User} [user]
 * @property {string} [$type]
*/
/**
 * @typedef {object} DurationValue
 * @property {number} [minutes]
 * @property {string} [presentation]
 * @property {string} [$type]
*/
/**
 * @typedef {object} EmailSettings
 * @property {boolean} [isEnabled]
 * @property {string} [host]
 * @property {number} [port]
 * @property {string} [mailProtocol]
 * @property {boolean} [anonymous]
 * @property {string} [login]
 * @property {StorageEntry} [sslKey]
 * @property {string} [from]
 * @property {string} [replyTo]
 * @property {string} [$type]
*/
/**
 * @typedef {(BaseBundle|object)} EnumBundle
*/
/**
 * @typedef {(BundleCustomFieldDefaults|object)} EnumBundleCustomFieldDefaults
*/
/**
 * @typedef {(LocalizableBundleElement)} EnumBundleElement
*/
/**
 * @typedef {(BundleProjectCustomField|object)} EnumProjectCustomField
*/
/**
 * @typedef {object} ExternalIssue
 * @property {string} [name]
 * @property {string} [url]
 * @property {string} [key]
 * @property {string} [$type]
*/
/**
 * @typedef {(ColorCoding|object)} FieldBasedColorCoding
*/
/**
 * @typedef {object} FieldStyle
 * @property {string} [background]
 * @property {string} [foreground]
 * @property {string} [$type]
*/
/**
 * @typedef {object} FieldType
 * @property {string} [id]
 * @property {string} [$type]
*/
/**
 * @typedef {object} FilterField
 * @property {string} [name]
 * @property {string} [$type]
*/
/**
 * @typedef {object} GeneralUserProfile
 * @property {DateFormatDescriptor} [dateFieldFormat]
 * @property {TimeZoneDescriptor} [timezone]
 * @property {LocaleDescriptor} [locale]
 * @property {string} [$type]
*/
/**
 * @typedef {object} GlobalSettings
 * @property {SystemSettings} [systemSettings]
 * @property {NotificationSettings} [notificationSettings]
 * @property {RestCorsSettings} [restSettings]
 * @property {AppearanceSettings} [appearanceSettings]
 * @property {LocaleSettings} [localeSettings]
 * @property {License} [license]
 * @property {string} [$type]
*/
/**
 * @typedef {object} GlobalTimeTrackingSettings
 * @property {Array<WorkItemType>} [workItemTypes]
 * @property {WorkTimeSettings} [workTimeSettings]
 * @property {string} [$type]
*/
/**
 * @typedef {(ProjectCustomField|object)} GroupProjectCustomField
*/
/**
 * @typedef {object} Issue
 * @property {string} [idReadable]
 * @property {number} [created]
 * @property {number} [updated]
 * @property {number} [resolved]
 * @property {number} [numberInProject]
 * @property {Project} [project]
 * @property {string} [summary]
 * @property {string} [description]
 * @property {boolean} [usesMarkdown]
 * @property {string} [wikifiedDescription]
 * @property {User} [reporter]
 * @property {User} [updater]
 * @property {User} [draftOwner]
 * @property {boolean} [isDraft]
 * @property {Visibility} [visibility]
 * @property {number} [votes]
 * @property {Array<IssueComment>} [comments]
 * @property {number} [commentsCount]
 * @property {Array<IssueTag>} [tags]
 * @property {Array<IssueLink>} [links]
 * @property {ExternalIssue} [externalIssue]
 * @property {Array<IssueCustomField>} [customFields]
 * @property {IssueVoters} [voters]
 * @property {IssueWatchers} [watchers]
 * @property {Array<IssueAttachment>} [attachments]
 * @property {IssueLink} [subtasks]
 * @property {IssueLink} [parent]
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueAttachment
 * @property {string} [name]
 * @property {User} [author]
 * @property {number} [created]
 * @property {number} [updated]
 * @property {number} [size]
 * @property {string} [extension]
 * @property {string} [charset]
 * @property {string} [mimeType]
 * @property {string} [metaData]
 * @property {boolean} [draft]
 * @property {boolean} [removed]
 * @property {string} [base64Content]
 * @property {string} [url]
 * @property {Visibility} [visibility]
 * @property {Issue} [issue]
 * @property {IssueComment} [comment]
 * @property {string} [thumbnailURL]
 * @property {string} [$type]
*/
/**
 * @typedef {(SwimlaneSettings|object)} IssueBasedSwimlaneSettings
*/
/**
 * @typedef {object} IssueComment
 * @property {string} [text]
 * @property {boolean} [usesMarkdown]
 * @property {string} [textPreview]
 * @property {number} [created]
 * @property {number} [updated]
 * @property {User} [author]
 * @property {Issue} [issue]
 * @property {Array<IssueAttachment>} [attachments]
 * @property {Visibility} [visibility]
 * @property {boolean} [deleted]
 * @property {string} [$type]
*/
/**
 * @typedef {(CreatedDeletedActivityItem|object)} IssueCreatedActivityItem
*/
/**
 * @typedef {object} IssueCustomField
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueFolder
 * @property {string} [name]
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueLink
 * @property {string} [direction]
 * @property {IssueLinkType} [linkType]
 * @property {Array<Issue>} [issues]
 * @property {Array<Issue>} [trimmedIssues]
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueLinkType
 * @property {string} [name]
 * @property {string} [localizedName]
 * @property {string} [sourceToTarget]
 * @property {string} [localizedSourceToTarget]
 * @property {string} [targetToSource]
 * @property {string} [localizedTargetToSource]
 * @property {boolean} [directed]
 * @property {boolean} [aggregation]
 * @property {boolean} [readOnly]
 * @property {string} [$type]
*/
/**
 * @typedef {(SimpleValueActivityItem|object)} IssueResolvedActivityItem
*/
/**
 * @typedef {(WatchFolder|object)} IssueTag
*/
/**
 * @typedef {object} IssueTimeTracker
 * @property {Array<IssueWorkItem>} [workItems]
 * @property {boolean} [enabled]
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueVoters
 * @property {boolean} [hasVote]
 * @property {Array<User>} [original]
 * @property {Array<DuplicateVote>} [duplicate]
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueWatcher
 * @property {User} [user]
 * @property {Issue} [issue]
 * @property {boolean} [isStarred]
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueWatchers
 * @property {boolean} [hasStar]
 * @property {Array<IssueWatcher>} [issueWatchers]
 * @property {Array<IssueWatcher>} [duplicateWatchers]
 * @property {string} [$type]
*/
/**
 * @typedef {object} IssueWorkItem
 * @property {User} [author]
 * @property {User} [creator]
 * @property {string} [text]
 * @property {string} [textPreview]
 * @property {WorkItemType} [type]
 * @property {number} [created]
 * @property {number} [updated]
 * @property {DurationValue} [duration]
 * @property {number} [date]
 * @property {Issue} [issue]
 * @property {boolean} [usesMarkdown]
 * @property {string} [$type]
*/
/**
 * @typedef {object} JabberSettings
 * @property {boolean} [isEnabled]
 * @property {string} [host]
 * @property {number} [port]
 * @property {string} [login]
 * @property {string} [serviceName]
 * @property {string} [$type]
*/
/**
 * @typedef {object} License
 * @property {string} [username]
 * @property {string} [license]
 * @property {string} [error]
 * @property {string} [$type]
*/
/**
 * @typedef {(Visibility|object)} LimitedVisibility
*/
/**
 * @typedef {(MultiValueActivityItem|object)} LinksActivityItem
*/
/**
 * @typedef {object} LocaleDescriptor
 * @property {string} [locale]
 * @property {string} [language]
 * @property {boolean} [community]
 * @property {string} [name]
 * @property {string} [$type]
*/
/**
 * @typedef {object} LocaleSettings
 * @property {LocaleDescriptor} [locale]
 * @property {boolean} [isRTL]
 * @property {string} [$type]
*/
/**
 * @typedef {(BundleElement|object)} LocalizableBundleElement
*/
/**
 * @typedef {object} Logo
 * @property {string} [url]
 * @property {string} [$type]
*/
/**
 * @typedef {(User)} Me
*/
/**
 * @typedef {(DatabaseMultiValueIssueCustomField|object)} MultiBuildIssueCustomField
*/
/**
 * @typedef {(DatabaseMultiValueIssueCustomField|object)} MultiEnumIssueCustomField
*/
/**
 * @typedef {(DatabaseMultiValueIssueCustomField|object)} MultiGroupIssueCustomField
*/
/**
 * @typedef {(DatabaseMultiValueIssueCustomField|object)} MultiOwnedIssueCustomField
*/
/**
 * @typedef {(DatabaseMultiValueIssueCustomField|object)} MultiUserIssueCustomField
*/
/**
 * @typedef {(ActivityItem)} MultiValueActivityItem
*/
/**
 * @typedef {(IssueCustomField|object)} DatabaseMultiValueIssueCustomField
*/
/**
 * @typedef {(DatabaseMultiValueIssueCustomField|object)} MultiVersionIssueCustomField
*/
/**
 * @typedef {object} NotificationSettings
 * @property {EmailSettings} [emailSettings]
 * @property {JabberSettings} [jabberSettings]
 * @property {string} [$type]
*/
/**
 * @typedef {object} NotificationsUserProfile
 * @property {boolean} [notifyOnOwnChanges]
 * @property {boolean} [jabberNotificationsEnabled]
 * @property {boolean} [emailNotificationsEnabled]
 * @property {boolean} [mentionNotificationsEnabled]
 * @property {boolean} [duplicateClusterNotificationsEnabled]
 * @property {boolean} [mailboxIntegrationNotificationsEnabled]
 * @property {boolean} [usePlainTextEmails]
 * @property {boolean} [autoWatchOnComment]
 * @property {boolean} [autoWatchOnVote]
 * @property {boolean} [autoWatchOnUpdate]
 * @property {string} [$type]
*/
/**
 * @typedef {object} OnlineUsers
 * @property {number} [users]
 * @property {string} [$type]
*/
/**
 * @typedef {(BaseBundle|object)} OwnedBundle
*/
/**
 * @typedef {(BundleCustomFieldDefaults|object)} OwnedBundleCustomFieldDefaults
*/
/**
 * @typedef {(BundleElement|object)} OwnedBundleElement
*/
/**
 * @typedef {(BundleProjectCustomField|object)} OwnedProjectCustomField
*/
/**
 * @typedef {object} ParsedCommand
 * @property {string} [description]
 * @property {boolean} [error]
 * @property {boolean} [delete]
 * @property {string} [$type]
*/
/**
 * @typedef {object} PeriodFieldFormat
 * @property {string} [id]
 * @property {string} [$type]
*/
/**
 * @typedef {(IssueCustomField|object)} PeriodIssueCustomField
*/
/**
 * @typedef {(ProjectCustomField)} PeriodProjectCustomField
*/
/**
 * @typedef {object} PeriodValue
 * @property {number} [minutes]
 * @property {string} [presentation]
 * @property {string} [$type]
*/
/**
 * @typedef {(FilterField)} PredefinedFilterField
*/
/**
 * @typedef {(IssueFolder|object)} Project
*/
/**
 * @typedef {(SingleValueActivityItem|object)} ProjectActivityItem
*/
/**
 * @typedef {(ColorCoding|object)} ProjectBasedColorCoding
*/
/**
 * @typedef {object} ProjectColor
 * @property {Project} [project]
 * @property {FieldStyle} [color]
 * @property {string} [$type]
*/
/**
 * @typedef {object} ProjectCustomField
 * @property {CustomField} [field]
 * @property {Project} [project]
 * @property {boolean} [canBeEmpty]
 * @property {string} [emptyFieldText]
 * @property {number} [ordinal]
 * @property {boolean} [isPublic]
 * @property {boolean} [hasRunningJob]
 * @property {string} [$type]
*/
/**
 * @typedef {object} ProjectTimeTrackingSettings
 * @property {boolean} [enabled]
 * @property {ProjectCustomField} [estimate]
 * @property {ProjectCustomField} [timeSpent]
 * @property {Array<WorkItemType>} [workItemTypes]
 * @property {Project} [project]
 * @property {string} [$type]
*/
/**
 * @typedef {object} RestCorsSettings
 * @property {string} [allowedOrigins]
 * @property {boolean} [allowAllOrigins]
 * @property {string} [$type]
*/
/**
 * @typedef {(WatchFolder|object)} SavedQuery
*/
/**
 * @typedef {(IssueCustomField|object)} SimpleIssueCustomField
*/
/**
 * @typedef {(ProjectCustomField)} SimpleProjectCustomField
*/
/**
 * @typedef {(SingleValueActivityItem|object)} SimpleValueActivityItem
*/
/**
 * @typedef {(DatabaseSingleValueIssueCustomField|object)} SingleBuildIssueCustomField
*/
/**
 * @typedef {(DatabaseSingleValueIssueCustomField|object)} SingleEnumIssueCustomField
*/
/**
 * @typedef {(DatabaseSingleValueIssueCustomField|object)} SingleGroupIssueCustomField
*/
/**
 * @typedef {(DatabaseSingleValueIssueCustomField|object)} SingleOwnedIssueCustomField
*/
/**
 * @typedef {(DatabaseSingleValueIssueCustomField|object)} SingleUserIssueCustomField
*/
/**
 * @typedef {(ActivityItem)} SingleValueActivityItem
*/
/**
 * @typedef {(IssueCustomField|object)} DatabaseSingleValueIssueCustomField
*/
/**
 * @typedef {(DatabaseSingleValueIssueCustomField|object)} SingleVersionIssueCustomField
*/
/**
 * @typedef {object} Sprint
 * @property {Agile} [agile]
 * @property {string} [name]
 * @property {string} [goal]
 * @property {number} [start]
 * @property {number} [finish]
 * @property {boolean} [archived]
 * @property {boolean} [isDefault]
 * @property {Array<Issue>} [issues]
 * @property {number} [unresolvedIssuesCount]
 * @property {Sprint} [previousSprint]
 * @property {string} [$type]
*/
/**
 * @typedef {(MultiValueActivityItem|object)} SprintActivityItem
*/
/**
 * @typedef {object} SprintsSettings
 * @property {boolean} [isExplicit]
 * @property {boolean} [cardOnSeveralSprints]
 * @property {Sprint} [defaultSprint]
 * @property {boolean} [disableSprints]
 * @property {string} [explicitQuery]
 * @property {CustomField} [sprintSyncField]
 * @property {boolean} [hideSubtasksOfCards]
 * @property {string} [$type]
*/
/**
 * @typedef {(BaseBundle|object)} StateBundle
*/
/**
 * @typedef {(BundleCustomFieldDefaults|object)} StateBundleCustomFieldDefaults
*/
/**
 * @typedef {(LocalizableBundleElement|object)} StateBundleElement
*/
/**
 * @typedef {(DatabaseSingleValueIssueCustomField|object)} StateIssueCustomField
*/
/**
 * @typedef {(BundleProjectCustomField|object)} StateProjectCustomField
*/
/**
 * @typedef {object} StorageEntry
 * @property {string} [name]
 * @property {string} [$type]
*/
/**
 * @typedef {object} Suggestion
 * @property {number} [completionStart]
 * @property {number} [completionEnd]
 * @property {number} [matchingStart]
 * @property {number} [matchingEnd]
 * @property {number} [caret]
 * @property {string} [description]
 * @property {string} [option]
 * @property {string} [prefix]
 * @property {string} [suffix]
 * @property {string} [group]
 * @property {string} [icon]
 * @property {string} [auxiliaryIcon]
 * @property {string} [className]
 * @property {string} [$type]
*/
/**
 * @typedef {(DatabaseAttributeValue|object)} SwimlaneEntityAttributeValue
*/
/**
 * @typedef {object} SwimlaneSettings
 * @property {boolean} [enabled]
 * @property {string} [$type]
*/
/**
 * @typedef {object} SwimlaneValue
 * @property {string} [name]
 * @property {string} [$type]
*/
/**
 * @typedef {object} SystemSettings
 * @property {string} [baseUrl]
 * @property {number} [maxUploadFileSize]
 * @property {number} [maxExportItems]
 * @property {string} [administratorEmail]
 * @property {boolean} [allowStatisticsCollection]
 * @property {boolean} [isApplicationReadOnly]
 * @property {string} [$type]
*/
/**
 * @typedef {(MultiValueActivityItem|object)} TagsActivityItem
*/
/**
 * @typedef {object} Telemetry
 * @property {string} [installationFolder]
 * @property {string} [databaseLocation]
 * @property {string} [logsLocation]
 * @property {number} [availableProcessors]
 * @property {string} [availableMemory]
 * @property {string} [allocatedMemory]
 * @property {string} [usedMemory]
 * @property {string} [uptime]
 * @property {number} [startedTime]
 * @property {number} [databaseBackgroundThreads]
 * @property {number} [pendingAsyncJobs]
 * @property {number} [cachedResultsCountInDBQueriesCache]
 * @property {string} [databaseQueriesCacheHitRate]
 * @property {string} [blobStringsCacheHitRate]
 * @property {number} [totalTransactions]
 * @property {string} [transactionsPerSecond]
 * @property {string} [requestsPerSecond]
 * @property {string} [databaseSize]
 * @property {string} [fullDatabaseSize]
 * @property {string} [textIndexSize]
 * @property {OnlineUsers} [onlineUsers]
 * @property {number} [reportCalculatorThreads]
 * @property {number} [notificationAnalyzerThreads]
 * @property {string} [$type]
*/
/**
 * @typedef {(CustomFieldActivityItem|object)} TextCustomFieldActivityItem
*/
/**
 * @typedef {object} TextFieldValue
 * @property {string} [text]
 * @property {string} [markdownText]
 * @property {string} [$type]
*/
/**
 * @typedef {(IssueCustomField|object)} TextIssueCustomField
*/
/**
 * @typedef {(SimpleValueActivityItem|object)} TextMarkupActivityItem
*/
/**
 * @typedef {(SimpleProjectCustomField)} TextProjectCustomField
*/
/**
 * @typedef {object} TimeTrackingUserProfile
 * @property {PeriodFieldFormat} [periodFormat]
 * @property {string} [$type]
*/
/**
 * @typedef {object} TimeZoneDescriptor
 * @property {string} [presentation]
 * @property {number} [offset]
 * @property {string} [$type]
*/
/**
 * @typedef {(Visibility)} UnlimitedVisibility
*/
/**
 * @typedef {object} User
 * @property {string} [login]
 * @property {string} [fullName]
 * @property {string} [email]
 * @property {string} [jabberAccountName]
 * @property {string} [ringId]
 * @property {boolean} [guest]
 * @property {boolean} [online]
 * @property {boolean} [banned]
 * @property {Array<IssueTag>} [tags]
 * @property {Array<SavedQuery>} [savedQueries]
 * @property {string} [avatarUrl]
 * @property {object} [profiles]
 * @property {string} [$type]
*/
/**
 * @typedef {(Bundle|object)} UserBundle
*/
/**
 * @typedef {(CustomFieldDefaults|object)} UserCustomFieldDefaults
*/
/**
 * @typedef {object} UserGroup
 * @property {string} [name]
 * @property {string} [ringId]
 * @property {number} [usersCount]
 * @property {string} [icon]
 * @property {boolean} [allUsersGroup]
 * @property {Project} [teamForProject]
 * @property {string} [$type]
*/
/**
 * @typedef {(BundleProjectCustomField|object)} UserProjectCustomField
*/
/**
 * @typedef {(SimpleValueActivityItem|object)} UsesMarkupActivityItem
*/
/**
 * @typedef {(CreatedDeletedActivityItem|object)} VcsChangeActivityItem
*/
/**
 * @typedef {(User|object)} VcsUnresolvedUser
*/
/**
 * @typedef {(BaseBundle|object)} VersionBundle
*/
/**
 * @typedef {(BundleCustomFieldDefaults|object)} VersionBundleCustomFieldDefaults
*/
/**
 * @typedef {(BundleElement|object)} VersionBundleElement
*/
/**
 * @typedef {(BundleProjectCustomField|object)} VersionProjectCustomField
*/
/**
 * @typedef {object} Visibility
 * @property {string} [$type]
*/
/**
 * @typedef {(MultiValueActivityItem|object)} VisibilityActivityItem
*/
/**
 * @typedef {(VisibilityActivityItem|object)} VisibilityGroupActivityItem
*/
/**
 * @typedef {(VisibilityActivityItem|object)} VisibilityUserActivityItem
*/
/**
 * @typedef {(MultiValueActivityItem|object)} VotersActivityItem
*/
/**
 * @typedef {object} WIPLimit
 * @property {number} [max]
 * @property {number} [min]
 * @property {AgileColumn} [column]
 * @property {string} [$type]
*/
/**
 * @typedef {(IssueFolder|object)} WatchFolder
*/
/**
 * @typedef {(CreatedDeletedActivityItem|object)} WorkItemActivityItem
*/
/**
 * @typedef {(SingleValueActivityItem|object)} WorkItemAuthorActivityItem
*/
/**
 * @typedef {(SingleValueActivityItem|object)} WorkItemDurationActivityItem
*/
/**
 * @typedef {object} WorkItemType
 * @property {string} [name]
 * @property {boolean} [autoAttached]
 * @property {string} [$type]
*/
/**
 * @typedef {(MultiValueActivityItem|object)} WorkItemTypeActivityItem
*/
/**
 * @typedef {object} WorkTimeSettings
 * @property {number} [minutesADay]
 * @property {number} [workDays]
 * @property {number} [firstDayOfWeek]
 * @property {number} [daysAWeek]
 * @property {string} [$type]
*/