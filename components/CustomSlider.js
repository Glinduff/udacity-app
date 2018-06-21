import React from 'react'
import { View, Text, Slider } from 'react-native'

export default function CustomSlider ({max, unit, step, value, onChange}) {
    return (
      <View>
        <Slider 
          value={value}
          minimumValue={0}
          maximumValue={max}
          step={step}
          onValueChange={onChange}
        />
        <View>
          <Text>{value}</Text>
          <Text>{unit}</Text>
        </View>
      </View>
    )

}