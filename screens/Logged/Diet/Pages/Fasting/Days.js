import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { NavigateBtn } from '../../../../../Components/Buttons'
import SelectDropdown from 'react-native-select-dropdown'

export default function Days({route}) {
    const [selectedGrams, setSelectedGrams] = useState(null)

    const Submit = () => {

    }

    const PageType = route.params.type;
    console.log(PageType);

    const houres = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

    const times = [
        {
            "title":"Item 1",
            "image":require('../../../../../assets/images/logged/diets/fasting/0.png'),
        },
        {
            "title":"Item 2",
            "image":require('../../../../../assets/images/logged/diets/fasting/1.png'),
        },
        {
            "title":"Item 3",
            "image":require('../../../../../assets/images/logged/diets/fasting/2.png'),
        },
        {
            "title":"Item 4",
            "image":require('../../../../../assets/images/logged/diets/fasting/3.png'),
        },
    ]

  return (
    <View style={{justifyContent: 'space-between', flex: 1, margin: 20}}>
        {PageType === "one" 
            ? (
            <>
                <View style={{flex: 1, justifyContent: 'space-around'}}>
                    <View>
                        <Text style={{textAlign: 'center', fontSize: 18}}> Select How many houres </Text>
                        <View style={{alignSelf: 'center', marginTop: 20}}>
                            <SelectDropdown
                                data={houres}
                                defaultButtonText={false}
                                buttonStyle={{width: "40%", borderColor: "#655DBB", borderBottomWidth: 1.4, borderRadius: 8}}
                                onSelect={(selectedItem, index) => {
                                    setSelectedGrams(selectedItem)
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{textAlign: 'center', marginBottom: 20, fontSize: 18}}> Select a Fasting plan </Text>
                        <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'space-between'}}>
                            {times.map((item,key)=>(
                                <TouchableOpacity key={key} style={{width: "49%", marginBottom: 10, paddingHorizontal: 20, paddingVertical: 26, backgroundColor: "white", borderRadius: 10, flexDirection: 'row', alignItems: 'center'}}>
                                    <Image source={item.image} style={{width: 40, height: 40}} />
                                    <Text style={{marginLeft: 6}}> {item.title} </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                <View>
                    {NavigateBtn("Continue", Submit, selectedGrams !== null, "#655DBB")}
                </View>
            </>
            ) 
            : (
                <Text> Fasting several days </Text>
            )
        }
    </View>
  )
}