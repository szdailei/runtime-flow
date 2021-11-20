/* eslint-disable no-console */
import { readFileSync } from 'fs';
import { parse } from 'acorn';
import { traverse, VisitorOption } from 'estraverse';

const input = `
function deep(){}
function debug(msg){
  console.log(msg);
}
function hello(msg,callback){
  callback(msg);
}
function nihao(msg){
  debug(msg)
}
function main(msg){  
  debug(msg);
  if (msg==='hello'){
    hello(msg,debug)
  } else {
    nihao(msg)
  }
  deep() 
}

const msg='hi'
main(msg)
`;

const options = {
  ecmaVersion: '2020',
  sourceType: 'module',
};

function walker(code) {
  const ast = parse(input, options);

  traverse(ast, {
    enter: (node, parent) => {
      if (node.type === 'FunctionExpression' || node.type === 'VariableDeclarator') return VisitorOption.Skip;
    },
    leave: (node, parent) => {
      //        if (node.type == 'VariableDeclarator')
      if (node.type === 'FunctionDeclaration') {
        console.log('Node:', node.id.name);
        if (parent) {
          console.log('Parent:', parent);
        } else {
          console.log('Root:', node.id.name);
        }
      }
    },
  });
}

//const code = readFileSync('./dist/server.js', 'utf8');
walker();
