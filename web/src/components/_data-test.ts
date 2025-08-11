export const CypressTestIDs = {
  NameLabelDropdown: 'console-select-menu-toggle',
  NameLabelDropdownOptions: 'console-select-item',
  NameInput: 'name-filter-input',
  LegacyTestIDs: {
    LabelInput: 'item-filter',
  },
  Classes: {
    HorizontalNav: '.pf-v6-c-tabs__item, .co-m-horizontal-nav__menu-item',
    SectionHeader: '.pf-v6-c-title.pf-m-h2, .co-section-heading',
    FilterDropdown: '.pf-v6-c-menu-toggle, .pf-v5-c-menu-toggle',
    FilterDropdownExpanded:
      '.pf-v6-c-menu-toggle.pf-m-expanded, .pf-v5-c-menu-toggle.pf-m-expanded',
    FilterDropdownOption: '.pf-v6-c-menu__item, .pf-c-select__menu-item',
    MainTag: '.pf-v6-c-label-group__label, .pf-v5-c-chip-group__label',
    IndividualTag: '.pf-v6-c-label__text, .pf-v5-c-chip__text',
    MoreLessTag: '.pf-v6-c-label-group__label, .pf-v5-c-chip-group__label',
    LabelSuggestion: '.pf-v6-c-label__content.pf-m-clickable, .co-suggestion-line',
    SilenceHelpText: '.pf-v6-c-helper-text__item-text, .pf-v5-c-helper-text__item-text',
    SilenceCommentWithoutError: '.pf-v6-c-form-control.pf-m-textarea.pf-m-resize-both',
    SilenceCommentWithError: '.pf-v6-c-form-control.pf-m-textarea.pf-m-resize-both.pf-m-error',
    SilenceCreatorWithError: '.pf-v6-c-form-control.pf-m-error',
    SilenceLabelRow: '.pf-v6-l-grid.pf-m-all-12-col-on-sm.pf-m-all-4-col-on-md.pf-m-gutter, .row',
    SilenceAlertTitle: '.pf-v6-c-alert__title, .pf-v5-c-alert__title',
    SilenceAlertDescription: '.pf-v6-c-alert__description, .pf-v5-c-alert__description',
    LabelTag: '.pf-v6-c-label__text, .pf-v5-c-label__text',
    GraphCard: '.pf-v6-c-card pf-m-compact',
    AlertingRuleRow: '.pf-v6-c-table__link.pf-v6-c-table__tr, .pf-v5-c-table__tr',
  },
  OUIA: {
    Table: 'OUIA-Generated-Table',
  },
  ExpandedRow: 'button[class="pf-v6-c-button pf-m-plain pf-m-expanded"]',
  ToExpandRow: 'button[class="pf-v6-c-button pf-m-plain"]',
};

export const AlertsPageTestIDs = {
  DownloadCSVButton: 'download-csv-button',
  AlertingRuleRow: {
    AlertingRuleArrow: 'alerting-rule-arrow',
    AlertingRuleTotalAlertsBadge: 'alerting-rule-total-alerts-badge',
    AlertingRuleStateBadge: 'alerting-rule-state-badge',
  },
  AlertRow: {
    AlertResourceIcon: 'alert-resource-icon',
    AlertResourceLink: 'alert-resource-link',
    AlertSeverityBadge: 'alert-severity-badge',
    AlertNamespace: 'alert-namespace',
    AlertState: 'alert-state',
    AlertSource: 'alert-source',
    AlertCluster: 'alert-cluster',
    SilenceAlertDropdownItem: 'silence-alert-dropdown-item',
  },
};

export const CommonAlertDetailsPageTestIDs = {
  AlertingRuleResourceIcon: 'alerting-rule-resource-icon',
  AlertingRuleResourceLink: 'alerting-rule-resource-link',
  AlertingRuleSeverityBadge: 'alerting-rule-severity-badge',
  Header: {
    AlertResourceIcon: 'alert-resource-icon',
    SeverityBadgeHeader: 'severity-badge-header',
  },
  Details: {
    Name: 'name',
    Severity: 'severity',
    Description: 'description',
    Summary: 'summary',
    Source: 'source',
    State: 'state',
    Labels: 'labels',
  },
};

export const AlertingRulesPageTestIDs = {
  AlertingRuleRow: {
    AlertingRuleStateBadge: 'alerting-rule-state-badge',
    AlertingRuleSource: 'alerting-rule-source',
  },
};

export const AlertRulesDetailsPageTestIDs = {
  Header: {
    AlertingRulesBreadcrumb: 'alerting-rules-breadcrumb',
  },
  Details: {
    For: 'for',
    Expression: 'expression',
  },
  ActiveAlerts: {
    Description: 'active-alerts',
  },
};

export const AlertingDetailsPageTestIDs = {
  Header: {
    AlertingBreadcrumb: 'alerting-breadcrumb',
    SilenceAlertButton: 'silence-alert-button',
  },
  Details: {
    AlertingRuleIcon: 'alerting-rule-icon',
    AlertingRuleLink: 'alerting-rule-link',
  },
};

export const SilencesPageTestIDs = {
  CreateSilenceButton: 'create-silence-btn',
  ExpireXSilencesButton: 'expire-x-silences-button',
  SilencesTable: {
    SilencesTable: 'silences-table',
    SelectAllCheckbox: 'select-all-checkbox',
    SelectCheckbox: 'select-checkbox',
    SilenceResourceIcon: 'silence-resource-icon',
    SilenceResourceLink: 'silence-resource-link',
    SilenceMatchersList: 'silence-matchers-list',
    SilenceCount: 'silence-count',
    SilenceState: 'silence-state',
    SilenceCreatedBy: 'silence-created-by',
    SilenceKebabDropdown: 'silence-kebab-dropdown',
    SilenceRecreateDropdownItem: 'silence-recreate-dropdown-item',
    SilenceEditDropdownItem: 'silence-edit-dropdown-item',
    SilenceExpireDropdownItem: 'silence-expire-dropdown-item',
    Name: 'name',
    Description: 'description',
    Summary: 'summary',
    Source: 'source',
  },
  ExpireSilenceModal: {
    ExpireSilenceButton: 'expire-silence-button',
    CancelButton: 'cancel-button',
  },
};

export const CreateSilencesPageTestIDs = {
  Description: 'description-header',
  SilenceFrom: 'silence-from',
  SilenceFor: 'silence-for',
  SilenceForToggle: 'silence-for-toggle',
  SilenceUntil: 'silence-until',
  StartImmediately: 'start-immediately',
  AlertLabelsDescription: 'alert-labels-description',
  LabelName: 'label-name',
  LabelValue: 'label-value',
  Regex: 'regex-checkbox',
  NegativeMatcherCheckbox: 'negative-matcher-checkbox',
  RemoveLabel: 'remove-label',
  AddLabel: 'add-label',
  Creator: 'creator',
  Comment: 'comment',
  SilenceButton: 'silence-button',
  CancelButton: 'cancel-button',
};

export const SilenceDetailsPageTestIDs = {
  Header: {
    SilencesBreadcrumb: 'silences-breadcrumb',
    SilenceResourceIcon: 'silence-resource-icon',
  },
  Details: {
    SilenceName: 'silence-name',
    SilenceMatchers: 'silence-matchers',
    SilenceCreatedBy: 'silence-created-by',
    SilenceState: 'silence-state',
    SilenceUpdatedAt: 'silence-updated-at',
    SilenceStartsAt: 'silence-starts-at',
    SilenceEndsAt: 'silence-ends-at',
    SilenceComment: 'silence-comment',
    SilenceFiringAlertsBadge: 'silence-firing-alerts-badge',
    SilenceFiringAlert: 'silence-firing-alert',
    SilenceFiringAlertSeverity: 'silence-firing-alert-severity',
  },
};

export const LegacyDashboardPageTestIDs = {
  TimeRangeDropdown: 'time-range-dropdown',
  TimeRangeDropdownOptions: 'time-range-dropdown-options',
  PollIntervalDropdown: 'poll-interval-dropdown',
  PollIntervalDropdownOptions: 'poll-interval-dropdown-options',
  Inspect: 'inspect',
  ExportAsCsv: 'export-as-csv',
};

export const PersesDashboardPageTestIDs = {
  ProjectMenuToggle: 'project-menu-toggle',
};

export const ComponentsTestIDs = {
  KebabDropdownButton: 'kebab-dropdown-button',
  DropdownPollInterval: 'dropdown-poll-interval',
  GraphUnitsDropDown: 'graph-units-dropdown',
  ResetZoomButton: 'reset-zoom-button',
  GraphTimespanDropdown: 'graph-timespan-dropdown',
  GraphTimespanInput: 'graph-timespan-input',
  StackedCheckbox: 'stacked-checkbox',
  DisconnectedCheckbox: 'disconnected-checkbox',
  TypeaheadSelect: {
    PredefinedQueriesDropdown: 'predefined-queries-dropdown',
  },
  SingleTypeaheadSelectListBox: 'single-typeahead-select-list-box',
  SingleTypeaheadTextInput: 'single-typeahead-text-input',
  SingleTypeaheadMenuToggle: 'single-typeahead-menu-toggle',
  MetricsPage: {
    HideShowGraphButton: 'hide-show-graph-button',
    ActionsDropdownButton: 'actions-dropdown-button',
    AddQueryDropdownItem: 'add-query-dropdown-item',
    ExpandCollapseAllDropdownItem: 'expand-collapse-all-dropdown-item',
    DeleteAllQueriesDropdownItem: 'delete-all-queries-dropdown-item',
    SeriesButton: 'series-button',
    ExportCsvDropdownItem: 'export-csv-dropdown-item',
    DisableEnableQueryDropdownItem: 'disable-enable-query-dropdown-item',
    HideShowAllSeriesDropdownItem: 'hide-show-all-series-dropdown-item',
    DeleteQueryDropdownItem: 'delete-query-dropdown-item',
    DuplicateQueryDropdownItem: 'duplicate-query-dropdown-item',
    YellowNoDatapointsFound: 'yellow-no-datapoints-found',
    SelectAllUnselectAllDropdownItem: 'select-all-unselect-all-dropdown-item',
    QueryTable: 'query-table',
    DisableEnableQuerySwitch: 'disable-enable-query-switch',
    ExpandCollapseAllButton: 'expand-collapse-all-button',
    NoQueryEnteredTitle: 'no-query-entered-title',
    NoQueryEntered: 'no-query-entered',
    InsertExampleQueryButton: 'insert-example-query-button',
    AddQueryButton: 'add-query-button',
    RunQueriesButton: 'run-queries-button',
  },
};
