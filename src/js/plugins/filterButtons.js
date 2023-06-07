import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'
//animacao
const duration = 600

//filtro de cidades
function filterByFiltro(filtro) {
    //para cada wm-city forEach
    $('[wm-city]').each(function (i, e) {
        //checar se o parametro que esta em wm-city e uma filtro passada
        const isTarget = $(this).attr('wm-city') === filtro
            || filtro === null
        //se verdade isTarget verdade exibe else esconde
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.filterButtons = function () {
    // SET para evitar repeticoes 
    const filters = new Set

    $('[wm-city]').each(function (i, e) {
        filters.add($(e).attr('wm-city'))
    })

    const btns = Array.from(filters).map(filter => {
        const btn = $('<button>')
            .addClass(['btn', 'bg-btn', 'text-pink']).html(filter)
        btn.on("click", e => filterByFiltro(filter))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'bg-btn', 'active']).html('Todas')
    btnAll.on("click", e => filterByFiltro(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}
onLoadHtmlSuccess(function () {
    $('[wm-city-buttons]').filterButtons()
})


