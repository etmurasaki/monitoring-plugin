# Playwright MCP Test Scenarios

Step-by-step browser test scenarios translated from Cypress E2E tests, designed for execution via [Playwright MCP](https://github.com/anthropics/playwright-mcp) tools.

## Format

Each `.md` file corresponds to one `.cy.ts` test file and contains:

| Section | Prefix | Context |
|---------|--------|---------|
| **Prerequisites (CLI)** | `P1, P2...` | Shell commands (operator install, RBAC). Not executable via browser. |
| **Setup (Browser)** | `S1, S2...` | Login, tour dismissal. Run once before tests. |
| **Before Each** | `BE.1, BE.2...` | Steps repeated before each test section (if applicable). |
| **Test** | `T1, T2...` | One section per `it()` block from the source test. |

Each step is a table row:

| Step | Action | Target | Expected Result |
|------|--------|--------|-----------------|

---

## Action Types

| Action | Playwright MCP Tool | Usage |
|--------|---------------------|-------|
| `navigate` | `browser_navigate` | Go to a URL |
| `click` | `browser_click` | Click element by `ref` from snapshot |
| `fill` | `browser_fill_form` | Fill form field (supports `selector` param) |
| `snapshot` | `browser_snapshot` | Capture accessibility tree (required before `click` or `verify`) |
| `screenshot` | `browser_take_screenshot` | Capture visual screenshot |
| `wait` | `browser_wait_for` | Wait N seconds (`time` param) |
| `wait_for` | `browser_wait_for` | Wait for text to appear |
| `verify` | `browser_snapshot` | Assert element is visible in snapshot tree |
| `hover` | `browser_hover` | Hover over element by `ref` |
| `select` | `browser_select_option` | Select dropdown option |
| `press_key` | `browser_press_key` | Press keyboard key |
| `evaluate` | `browser_evaluate` | Run JavaScript on the page |

### Execution pattern

Every `click` and `verify` action requires a preceding `snapshot` to obtain element refs:

1. Call `browser_snapshot` to get the accessibility tree
2. Find the element described in the **Target** column by matching text, role, or attributes
3. Use the `ref` from the snapshot to call the action tool

### Certificate acceptance (global rule)

OpenShift dev clusters use self-signed certificates. **After every `navigate` action**, check whether the browser landed on a certificate/privacy error page (page title "Privacy error", URL `chrome-error://chromewebdata/`). If so, always accept the certificate before continuing:

1. `snapshot` — capture the error page
2. `click` — **"Advanced"** button
3. `snapshot` — capture the expanded details
4. `click` — **"Proceed to ... (unsafe)"** link
5. `wait` 5 seconds — page loads after accepting

This applies to every navigation throughout the scenario, not just the initial login. It may happen for the console host, the OAuth host (`oauth-openshift.apps.*`), or any other OpenShift route. Always check and accept if present.

---

## Cypress Selector Mapping

These are the CSS selector patterns used in the Target column, translated from Cypress custom commands.

| Cypress Command | CSS Selector | Example |
|-----------------|-------------|---------|
| `cy.byTestID('x')` | `[data-test="x"]` | `[data-test="username"]` |
| `cy.byLegacyTestID('x')` | `[data-test-id="x"]` | `[data-test-id="application-launcher"]` |
| `cy.byAriaLabel('x')` | `[aria-label="x"]` | `[aria-label="Close"]` |
| `cy.byDataID('x')` | `[data-id="x"]` | `[data-id="korrel8r_graph"]` |
| `cy.byButtonText('x')` | `button[type="button"]` containing text `x` | button "Focus" |
| `cy.bySemanticElement('tag', 'text')` | `tag` containing `text` | `h1` containing "Alerting" |
| `cy.byOUIAID('x')` | `[data-ouia-component-id^="x"]` | OUIA component prefix match |
| `cy.byPFRole('x')` | `[role="x"]` | `[role="dialog"]` |
| `cy.byTestActionID('x')` | `[data-test-action="x"]:not([disabled])` | Enabled action button |
| `cy.byTestSelector('x')` | `[data-test-selector="x"]` | Test selector attribute |
| `cy.byDataTestID('x')` | `[data-testid="x"]` | MUI data-testid |

---

## Environment Variables

All scenario files source their values from **`cypress/export-env.sh`**. Before executing any scenario, run:

```shell
source cypress/export-env.sh
```

| Scenario Variable | `export-env.sh` key | How to extract |
|-------------------|---------------------|----------------|
| `BASE_URL` | `CYPRESS_BASE_URL` | Use directly |
| `LOGIN_IDP` | `CYPRESS_LOGIN_IDP` | Use directly (e.g. `kube:admin` or `my_htpasswd_provider`) |
| `LOGIN_USERNAME` | `CYPRESS_LOGIN_USERS` | `echo $CYPRESS_LOGIN_USERS \| cut -d',' -f1 \| cut -d':' -f1` |
| `LOGIN_PASSWORD` | `CYPRESS_LOGIN_USERS` | `echo $CYPRESS_LOGIN_USERS \| cut -d',' -f1 \| cut -d':' -f2` |
| `KUBECONFIG_PATH` | `CYPRESS_KUBECONFIG_PATH` | Use directly |
| `COO_NAMESPACE` | `CYPRESS_COO_NAMESPACE` | Use directly (default: `openshift-cluster-observability-operator`) |
| `SKIP_ALL_INSTALL` | `CYPRESS_SKIP_ALL_INSTALL` | Use directly (`true` / `false`) |

---

## Scenario Index

| Scenario | Source Test |
|----------|------------|
| [coo/01.coo_bvt.md](coo/01.coo_bvt.md) | `cypress/e2e/coo/01.coo_bvt.cy.ts` |
| [monitoring/00.bvt_admin.md](monitoring/00.bvt_admin.md) | `cypress/e2e/monitoring/00.bvt_admin.cy.ts` |
