export const CypressTestIDs = {
  NameLabelDropdown: 'console-select-menu-toggle', // USED in list-page.ts
  NameLabelDropdownOptions: 'console-select-item', // USED in list-page.ts
  NameInput: 'name-filter-input', // USED in list-page.ts
  LegacyTestIDs: {
    LabelInput: 'item-filter', // USED in list-page.ts and common.ts
  },
  Classes: {
    HorizontalNav: '.pf-v6-c-tabs__item, .co-m-horizontal-nav__menu-item', // USED in list-page.ts and nav.ts
    SectionHeader: '.pf-v6-c-title.pf-m-h2, .co-section-heading', // USED in details-page.ts
    FilterDropdown: '.pf-v6-c-menu-toggle, .pf-v5-c-menu-toggle', // USED in list-page.ts
    FilterDropdownExpanded:
      '.pf-v6-c-menu-toggle.pf-m-expanded, .pf-v5-c-menu-toggle.pf-m-expanded', // USED in list-page.ts
    FilterDropdownOption: '.pf-v6-c-menu__item, .pf-c-select__menu-item', // USED in list-page.ts and alerting-rule-details-page.ts
    MainTag: '.pf-v6-c-label-group__label, .pf-v5-c-chip-group__label', // USED in list-page.ts
    IndividualTag: '.pf-v6-c-label__text, .pf-v5-c-chip__text', // USED in list-page.ts
    MoreLessTag: '.pf-v6-c-label-group__label, .pf-v5-c-chip-group__label', // USED in list-page.ts
    LabelSuggestion: '.pf-v6-c-label__content.pf-m-clickable, .co-suggestion-line', // USED in list-page.ts
    SilenceHelpText: '.pf-v6-c-helper-text__item-text, .pf-v5-c-helper-text__item-text', // USED in silence-alert-page.ts
    SilenceCommentWithoutError: '.pf-v6-c-form-control.pf-m-textarea.pf-m-resize-both', // USED in silence-alert-page.ts
    SilenceCommentWithError: '.pf-v6-c-form-control.pf-m-textarea.pf-m-resize-both.pf-m-error', // USED in silence-alert-page.ts
    SilenceCreatorWithError: '.pf-v6-c-form-control.pf-m-error', // USED in silence-alert-page.ts
    SilenceLabelRow: '.pf-v6-l-grid.pf-m-all-12-col-on-sm.pf-m-all-4-col-on-md.pf-m-gutter, .row', // USED in silence-alert-page.ts
    SilenceAlertTitle: '.pf-v6-c-alert__title, .pf-v5-c-alert__title', // USED in silence-alert-page.ts
    SilenceAlertDescription: '.pf-v6-c-alert__description, .pf-v5-c-alert__description', // USED in silence-alert-page.ts
    LabelTag: '.pf-v6-c-label__text, .pf-v5-c-label__text', // USED in details-page.ts
    GraphCard: '.pf-v6-c-card pf-m-compact', // USED in alerting-rule-details-page.ts
  },
  OUIA: {
    Table: 'OUIA-Generated-Table', // USED in list-page.ts
  },
  ExpandedRow: 'button[class="pf-v6-c-button pf-m-plain pf-m-expanded"]', // USED in list-page.ts
  ToExpandRow: 'button[class="pf-v6-c-button pf-m-plain"]' // USED in list-page.ts
};

export const AlertsPageTestIDs = {
  DownloadCSVButton: 'download-csv-button', // USED in list-page.ts
  AlertingRuleRow: {
    AlertingRuleArrow: 'alerting-rule-arrow', // -- NOT USED
    AlertingRuleResourceIcon: 'alerting-rule-resource-icon', // USED in list-page.ts
    AlertingRuleResourceLink: 'alerting-rule-resource-link', // USED in list-page.ts
    AlertingRuleSeverityBadge: 'alerting-rule-severity-badge', // USED in list-page.ts
    AlertingRuleTotalAlertsBadge: 'alerting-rule-total-alerts-badge', // USED in list-page.ts
    AlertingRuleStateBadge: 'alerting-rule-state-badge', // USED in list-page.ts
  },
  AlertRow: {
    AlertResourceIcon: 'alert-resource-icon', // USED in list-page.ts
    AlertResourceLink: 'alert-resource-link', // USED in list-page.ts
    AlertSeverityBadge: 'alert-severity-badge', // USED in list-page.ts
    AlertNamespace: 'alert-namespace', // USED in list-page.ts
    AlertState: 'alert-state', // -- NOT USED
    AlertSource: 'alert-source', // -- NOT USED
    AlertCluster: 'alert-cluster', // -- NOT USED
    SilenceAlertDropdownItem: 'silence-alert-dropdown-item', // -- NOT USED
  },
};

export const CommonAlertDetailsPageTestIDs = {
  Header: {
    AlertResourceIcon: 'alert-resource-icon', // USED in alerting-rule-details-page.ts
    SeverityBadgeHeader: 'severity-badge-header', // -- NOT USED
  },
  Details: {
    Name: 'name', // -- NOT USED
    Severity: 'severity', // -- NOT USED
    Description: 'description', // -- NOT USED
    Summary: 'summary', // -- NOT USED
    Source: 'source', // -- NOT USED
    State: 'state', // -- NOT USED
    Labels: 'labels', // -- NOT USED
  },
};

export const AlertingRulesPageTestIDs = {
  AlertingRuleRow: {
    AlertingRuleResourceIcon: 'alerting-rule-resource-icon', // -- NOT USED
    AlertingRuleResourceLink: 'alerting-rule-resource-link', // -- NOT USED
    AlertingRuleSeverityBadge: 'alerting-rule-severity-badge', // -- NOT USED
    AlertingRuleStateBadge: 'alerting-rule-state-badge', // -- NOT USED
    AlertingRuleSource: 'alerting-rule-source', // -- NOT USED
  },
};

export const AlertRulesDetailsPageTestIDs = {
  Header: {
    AlertingRulesBreadcrumb: 'alerting-rules-breadcrumb', // USED in alerting-rule-details-page.ts
  },
  Details: {
    For: 'for', // -- NOT USED
    Expression: 'expression', // USED in alerting-rule-details-page.ts
  },
  ActiveAlerts: {
    Description: 'active-alerts', // USED in alerting-rule-details-page.ts
  },
};

export const AlertingDetailsPageTestIDs = {
  Header: {
    AlertingBreadcrumb: 'alerting-breadcrumb', // -- NOT USED
    SilenceAlertButton: 'silence-alert-button', // -- NOT USED
  },
  Details: {
    AlertingRuleIcon: 'alerting-rule-icon', // -- NOT USED
    AlertingRuleLink: 'alerting-rule-link', // -- NOT USED
  },
};

export const SilencesPageTestIDs = {
  CreateSilenceButton: 'create-silence-btn', // USED in silences-list-page.ts
  ExpireXSilencesButton: 'expire-x-silences-button', // -- NOT USED
  SilencesTable: {
    SilencesTable: 'silences-table', // -- NOT USED
    SelectAllCheckbox: 'select-all-checkbox', // -- NOT USED
    SelectCheckbox: 'select-checkbox', // -- NOT USED
    SilenceResourceIcon: 'silence-resource-icon', // -- NOT USED
    SilenceResourceLink: 'silence-resource-link', // -- NOT USED
    SilenceMatchersList: 'silence-matchers-list', // -- NOT USED
    SilenceCount: 'silence-count', // -- NOT USED
    SilenceState: 'silence-state', // -- NOT USED
    SilenceCreatedBy: 'silence-created-by', // -- NOT USED
    SilenceKebabDropdown: 'silence-kebab-dropdown', // -- NOT USED
    SilenceRecreateDropdownItem: 'silence-recreate-dropdown-item', // -- NOT USED
    SilenceEditDropdownItem: 'silence-edit-dropdown-item', // -- NOT USED
    SilenceExpireDropdownItem: 'silence-expire-dropdown-item', // -- NOT USED
    Name: 'name', // -- NOT USED
    Description: 'description', // -- NOT USED
    Summary: 'summary', // -- NOT USED
    Source: 'source', // -- NOT USED
  },
  ExpireSilenceModal: {
    ExpireSilenceButton: 'expire-silence-button', // -- NOT USED
    CancelButton: 'cancel-button', // -- NOT USED
  },
};

export const CreateSilencesPageTestIDs = {
  Description: 'description-header', // -- NOT USED
  SilenceFrom: 'silence-from', // USED in silence-alert-page.ts
  SilenceFor: 'silence-for', // USED in silence-alert-page.ts
  SilenceForToggle: 'silence-for-toggle', // USED in silence-alert-page.ts
  SilenceUntil: 'silence-until', // USED in silence-alert-page.ts
  StartImmediately: 'start-immediately', // USED in silence-alert-page.ts
  AlertLabelsDescription: 'alert-labels-description', // -- NOT USED
  LabelName: 'label-name', // USED in silence-alert-page.ts
  LabelValue: 'label-value', // USED in silence-alert-page.ts
  Regex: 'regex-checkbox', // USED in silence-alert-page.ts
  NegativeMatcherCheckbox: 'negative-matcher-checkbox', // USED in silence-alert-page.ts
  RemoveLabel: 'remove-label', // USED in silence-alert-page.ts
  AddLabel: 'add-label', // -- NOT USED
  Creator: 'creator', // USED in silence-alert-page.ts
  Comment: 'silence-comment', // USED in silence-alert-page.ts
  SilenceButton: 'silence-button', // USED in silence-alert-page.ts
  CancelButton: 'cancel-button', // USED in silence-alert-page.ts
};

export const SilenceDetailsPageTestIDs = {
  Header: {
    SilencesBreadcrumb: 'silences-breadcrumb', // -- NOT USED
    SilenceResourceIcon: 'silence-resource-icon', // -- NOT USED
  },
  Details: {
    SilenceName: 'silence-name', // -- NOT USED
    SilenceMatchers: 'silence-matchers', // -- NOT USED
    SilenceCreatedBy: 'silence-created-by', // -- NOT USED
    SilenceState: 'silence-state', // -- NOT USED
    SilenceUpdatedAt: 'silence-updated-at', // -- NOT USED
    SilenceStartsAt: 'silence-starts-at', // -- NOT USED
    SilenceEndsAt: 'silence-ends-at', // -- NOT USED
    SilenceComment: 'silence-comment', // -- NOT USED
    SilenceFiringAlertsBadge: 'silence-firing-alerts-badge', // -- NOT USED
    SilenceFiringAlert: 'silence-firing-alert', // -- NOT USED
    SilenceFiringAlertSeverity: 'silence-firing-alert-severity', // -- NOT USED
  },
};

export const LegacyDashboardPageTestIDs = {
  TimeRangeDropdown: 'time-range-dropdown', // -- NOT USED
  TimeRangeDropdownOptions: 'time-range-dropdown-options', // -- NOT USED
  PollIntervalDropdown: 'poll-interval-dropdown', // -- NOT USED
  PollIntervalDropdownOptions: 'poll-interval-dropdown-options', // -- NOT USED
  Inspect: 'inspect', // -- NOT USED
  ExportAsCsv: 'export-as-csv', // -- NOT USED
};

export const PersesDashboardPageTestIDs = {
  ProjectMenuToggle: 'project-menu-toggle', // -- NOT USED
};

export const ComponentsTestIDs = {
  KebabDropdownButton: 'kebab-dropdown-button', // USED in alerting-rule-details-page.ts
  DropdownPollInterval: 'dropdown-poll-interval', // -- NOT USED
  GraphUnitsDropDown: 'graph-units-dropdown', // -- NOT USED
  ResetZoomButton: 'reset-zoom-button', // -- NOT USED
  GraphTimespanDropdown: 'graph-timespan-dropdown', // -- NOT USED
  GraphTimespanInput: 'graph-timespan-input', // -- NOT USED
  StackedCheckbox: 'stacked-checkbox', // -- NOT USED
  DisconnectedCheckbox: 'disconnected-checkbox', // -- NOT USED
  TypeaheadSelect: {
    PredefinedQueriesDropdown: 'predefined-queries-dropdown', // -- NOT USED
  },
  SingleTypeaheadSelectListBox: 'single-typeahead-select-list-box', // -- NOT USED
  SingleTypeaheadTextInput: 'single-typeahead-text-input', // -- NOT USED
  SingleTypeaheadMenuToggle: 'single-typeahead-menu-toggle', // -- NOT USED
  MetricsPage: {
    HideShowGraphButton: 'hide-show-graph-button', // USED in alerting-rule-details-page.ts
    ActionsDropdownButton: 'actions-dropdown-button', // -- NOT USED
    AddQueryDropdownItem: 'add-query-dropdown-item', // -- NOT USED
    ExpandCollapseAllDropdownItem: 'expand-collapse-all-dropdown-item', // -- NOT USED
    DeleteAllQueriesDropdownItem: 'delete-all-queries-dropdown-item', // -- NOT USED
    SeriesButton: 'series-button', // -- NOT USED
    ExportCsvDropdownItem: 'export-csv-dropdown-item', // -- NOT USED
    DisableEnableQueryDropdownItem: 'disable-enable-query-dropdown-item', // -- NOT USED
    HideShowAllSeriesDropdownItem: 'hide-show-all-series-dropdown-item', // -- NOT USED
    DeleteQueryDropdownItem: 'delete-query-dropdown-item', // -- NOT USED
    DuplicateQueryDropdownItem: 'duplicate-query-dropdown-item', // -- NOT USED
    YellowNoDatapointsFound: 'yellow-no-datapoints-found', // -- NOT USED
    SelectAllUnselectAllDropdownItem: 'select-all-unselect-all-dropdown-item', // -- NOT USED
    QueryTable: 'query-table', // -- NOT USED
    DisableEnableQuerySwitch: 'disable-enable-query-switch', // -- NOT USED
    ExpandCollapseAllButton: 'expand-collapse-all-button', // -- NOT USED
    NoQueryEnteredTitle: 'no-query-entered-title', // -- NOT USED
    NoQueryEntered: 'no-query-entered', // -- NOT USED
    InsertExampleQueryButton: 'insert-example-query-button', // -- NOT USED
    AddQueryButton: 'add-query-button', // -- NOT USED
    RunQueriesButton: 'run-queries-button', // -- NOT USED
  },
};
