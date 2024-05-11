import type { Rule } from 'eslint'

export default {
  meta: {
    type: 'layout',
    docs: {
      description: 'Require an empty line between statements and control flow structures (if, for, while, etc.) if curly braces are omitted.',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      missingIfEmptyline: 'Expected an empty line after the if statement.',
      missingForEmptyline: 'Expected an empty line after the for statement.',
      missingWhileEmptyline: 'Expected an empty line after the while statement.',
    },
  },
  create: (context) => {
    return {
      IfStatement(node) {
        if (
          !node.consequent || node.consequent.type !== 'BlockStatement') {
          const nextToken = context.sourceCode.getTokenAfter(node)
          if (nextToken && nextToken.type !== 'Punctuator' && nextToken.loc.start.line === node.loc!.end.line + 1) {
            context.report({
              node,
              loc: {
                start: nextToken.loc.start,
                end: nextToken.loc.start,
              },
              messageId: 'missingIfEmptyline',
              fix(fixer) {
                return fixer.replaceTextRange([node.range![1], node.range![1]], '\n')
              },
            })
          }
        }
      },
      ForStatement(node) {
        if (!node.body || node.body.type !== 'BlockStatement') {
          const nextToken = context.sourceCode.getTokenAfter(node)
          if (nextToken && nextToken.type !== 'Punctuator' && nextToken.loc.start.line === node.loc!.end.line + 1) {
            context.report({
              node,
              loc: {
                start: nextToken.loc.start,
                end: nextToken.loc.start,
              },
              messageId: 'missingForEmptyline',
              fix(fixer) {
                return fixer.replaceTextRange([node.range![1], node.range![1]], '\n')
              },
            })
          }
        }
      },
      WhileStatement(node) {
        if (!node.body || node.body.type !== 'BlockStatement') {
          const nextToken = context.sourceCode.getTokenAfter(node)
          if (nextToken && nextToken.type !== 'Punctuator' && nextToken.loc.start.line === node.loc!.end.line + 1) {
            context.report({
              node,
              loc: {
                start: nextToken.loc.start,
                end: nextToken.loc.start,
              },
              messageId: 'missingWhileEmptyline',
              fix(fixer) {
                return fixer.replaceTextRange([node.range![1], node.range![1]], '\n')
              },
            })
          }
        }
      },
    }
  },
} as Rule.RuleModule
