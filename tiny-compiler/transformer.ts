import { NodeTypes, RootNode } from "./ast";
import { traverser } from "./traverser";
export function transformer (ast: RootNode){
    const newAst = {
        type: NodeTypes.Program,
        body: []
    };

    ast.context = newAst.body

    traverser(ast,{
        CallExpression: {
            enter(node,parent) {
                // 如果节点类型是CallExpression,即函数调用表达式
                if(node.type === NodeTypes.CallExpression) {
                    // 构造一个新的CallExpression节点
                    let expression: any = {
                        type: "CallExpression",
                        callee: {  // callee是调用的函数标识符
                            type: "Identifier",
                            name: node.name
                        },
                        arguments: [],   // arguments为参数占位
                    };
                    
                    node.context = expression.arguments;

                    // 如果父节点不是CallExpression,则再包一层ExpressionStatement
                    if(parent?.type !== NodeTypes.CallExpression){
                        expression = {
                            type: "ExpressionStatement",
                            expression,
                        }
                    }

                    // 将ExpressionStatement推入父节点context中
                    parent?.context?.push(expression)
                }
            }
        },

        NumberLiteral: {
            enter(node, parent) {
                if(node.type === NodeTypes.NumberLiteral) {
                    const numberNode: any = {
                        type: "NumberLiteral",
                        value: node.value
                    };

                    parent?.context?.push(numberNode)
                }
            }
        }
    })

    return newAst
}