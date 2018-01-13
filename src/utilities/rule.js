const { getStyleSheet } = './stylesheet'

export const findRule = ({ selector, stylesheet }, d = document) => {
  const rules = getRules({ stylesheet }, d)
  const index = findRuleIndex({ selector, stylesheet }, d)
  const rule = index !== false ? rules[index] : false

  return rule
}

export const findRuleIndex = ({ selector, stylesheet }, d = document) => {
  const rules = getRules({ stylesheet }, d)
  let index = false
  for (let i = 0, len = Object.keys(rules).length; i < len; i++) {
    if (rules[i].selectorText === selector) {
      index = i; break
    }
  }

  return index
}

export const getRules = ({ stylesheet }, d = document) => {
  const sheet = getStyleSheet({ stylesheet }, d)

  return sheet.cssRules || sheet.rules
}

export const getRuleIndex = ({ ruleIndex, rule, selector, stylesheet }, d = document) => {
  let newRuleIndex
  if (!ruleIndex) {
    if (rule) {
      newRuleIndex = findRuleIndex({ selector, stylesheet }, d)
    } else {
      const len = getRules().length
      newRuleIndex = len ? len - 1 : 0
    }
  }

  return newRuleIndex
}

export const addRule = ({ ruleIndex, rule, selector, stylesheet }, d = document) => {
  const index = getRuleIndex({ ruleIndex, rule, stylesheet }, d)
  getStyleSheet({ stylesheet }, d)
    .insertRule(selector + ' { }', index)

  return getRules({ stylesheet }, d)[index]
}

export const removeRule = ({ ruleIndex, rule, selector, stylesheet }, d = document) => {
  const index = getRuleIndex({ ruleIndex, rule, stylesheet }, d)
  const sheet = getStyleSheet({ stylesheet }, d)
    .deleteRule(index)

  return sheet
}

export const getRule = ({ selector, stylesheet }, d = document) => {
  this.rule = findRule({ selector, stylesheet }, d) || addRule()
  return this.rule
}

export const isImportant = (prop) => {
  return prop.toString().indexOf('!important') >= 0 ? 'important' : ''
}
