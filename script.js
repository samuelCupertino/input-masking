const formatPattern = (inputStr, pattern, example='') => {
    const strRegExp = String(pattern).replace(/(^\/(?=[^\^]))|((?<=[^$])\/.*$)/g, '')
    
    // fixed
    const arrStrRegFixed = strRegExp.replace(/\\/g, '').split(/\([^()]+\)/g)
    const arrCharRegFixed = arrStrRegFixed.reduce((acc, e)=> [...acc, ...e], [])

    // dynamic
    const arrStrRegDynamic = strRegExp.match(/\([^()]+\)/g)
    const regExpDynamic = RegExp(arrStrRegDynamic.join(''))
    const inputStrDynamic = arrCharRegFixed.reduce((acc, e) => acc.replace(e, ''), inputStr)
    const exampleDynamic = arrCharRegFixed.reduce((acc, e) => acc.replace(e, ''), example)

    // Format
    const format = arrStrRegFixed.reduce((acc, e, i) => acc+e+'$'+(i+1), '').replace(/\$\d+$/, '')
    const exampleToComplete = exampleDynamic.slice(inputStrDynamic.length)
    const inputStrCompleted = inputStrDynamic + exampleToComplete
    const inputStrCompletedFormated = inputStrCompleted.replace(regExpDynamic, format).replace(/(.*\/\^)|(\$\/.*)/g, '')
    const inputStrFormated = [...exampleToComplete].reverse().reduce((acc, e)=> 
        acc.slice(0, acc.lastIndexOf(e)), inputStrCompletedFormated)
    
    return inputStrCompletedFormated == inputStrCompleted ? false : inputStrFormated
}

const applyMask = pattern => {
    const inputEl = event.target
    const example = inputEl.placeholder            
    setTimeout(()=> inputEl.value = formatPattern(inputEl.value, pattern, example) || inputEl.value.slice(0, -1), 0)
}