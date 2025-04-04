import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import CircularProgress from 'react-native-circular-progress-indicator';
import React from "react";

export default function MacroCard({ macro, target, consumed }: { macro: string, target: number, consumed: number }) {

    const ratio = 0.4;

    function strokeColor() {
        // const ratio = consumed / target;
        // const color = 255 * ratio;
        // const green = color <= 255 ? color : 255;
        // const red = 255 - green;
        // const blue = 0;
        // return `rgb(${red}, ${green}, ${blue})`
        return "rgb(255, 0, 0)"
    }


    return (
        <Card variant="elevated" className="rounded-xl w-full h-fit grow p-2 m-auto">
            <Center className="aspect-video m-auto">
                <Center className="w-fit">
                    <CircularProgress
                        value={consumed}
                        radius={35}
                        duration={2000}
                        progressValueColor={'black'}
                        activeStrokeColor={strokeColor()}
                        activeStrokeWidth={5}
                        inActiveStrokeWidth={5}
                        maxValue={target}
                        valueSuffix="g"
                        title={macro}
                        titleColor={'black'}
                        titleStyle={{ fontWeight: 'bold' }}
                    />
                </Center>
            </Center>
        </Card>
    );
};