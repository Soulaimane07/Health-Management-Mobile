export const IMC = (user, IMCData) => {
    let title
    let imc
    let color

    const Indic = () => {
        const height = Number(user?.height?.X) * 100 + Number(user?.height?.Y)
        const imc = (user?.CWeight)*10000 / Math.pow(height, 2)
        return imc
    }

    IMCData?.map(item=>(
        Indic() <= item.to && Indic() >= item.from && (
            title = item.title,
            color = item.color,
            imc = (Indic())?.toFixed(2)
        )
    ))

    return {title, imc, color}
}

export const Calories = (weight, height, age, sex, goal, active) => {
    let malecalories
    let womencalories

    goal === "Maintain Weight" && (
        <>
        {malecalories = (10*weight)+(6.25*height)-(5*age+5)}
        {womencalories = (10*weight)+(6.25*height)-(5*age-161)}
        </>
    )

    goal === "Lose Weight" && (
        <>
        {malecalories = (10*weight)+(6.25*height)-(5*age)+5-(((10*weight)+(6.25*height)-(5*age)+5)*15)/100}
        {womencalories = (10*weight)+(6.25*height)-(5*age)-161-(((10*weight)+(6.25*height)-(5*age)-161)*15)/100}
        </>
    )

    goal === "Gain Weight" && (
        <>
        {malecalories = (10*weight)+(6.25*height)-(5*age)+5+(((10*weight)+(6.25*height)-(5*age)+5)*15)/100}
        {womencalories = (10*weight)+(6.25*height)-(5*age)-161+(((10*weight)+(6.25*height)-(5*age)-161)*15)/100}
        </>
    )
    
    active === "Sédentaire" && (
        <>
        {malecalories = malecalories * 1.2}
        {womencalories = womencalories * 1.2}
        </>
    )

    active === "Légèrement actif" && (
        <>
        {malecalories = malecalories * 1.375}
        {womencalories = womencalories * 1.375}
        </>
    )
    active === "Modérément actif" && (
        <>
        {malecalories = malecalories * 1.55}
        {womencalories = womencalories * 1.55}
        </>
    )
    active === "Très actif" && (
        <>
        {malecalories = malecalories * 1.725}
        {womencalories = womencalories * 1.725}
        </>
    )

    return sex === "Female" ? womencalories : malecalories
}

export const Water = (weight) => {
    return weight*30
}

export const Steps = (goal) => {
    let step 

    goal === "Maintain Weight" && ( step = 6000 )

    goal === "Lose Weight" && ( step = 10000)

    goal === "Gain Weight" && ( step = 6000)

    return step
}