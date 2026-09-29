import Svg, { Rect, Path } from 'react-native-svg';

interface ListIconProps {
    backgroundColor: string;
    iconColor: string;
    size?: number;
}

export function ListIcon({ backgroundColor, iconColor, size=32 }: ListIconProps) {
    return (
        <Svg width={ size } height={ size } viewBox="0 0 32 32" fill="none">
            <Rect width={ 32 } height={ 32 } rx={ 16 } fill={ backgroundColor }/>

            <Path
                d="M22 9.5L21 9L20 9.5L19 9L18 9.5L17 9L16 9.5L15 9L14 9.5L12.5 9V17.0016H19.5V21.25C19.5 22.2166 20.5334 23 21.5 23H21.875C22.8416 23 23.5 22.2166 23.5 21.25V9L22 9.5ZM16.5156 15.5L16.5 14.5H21.4844L21.5 15.5H16.5156ZM14.5156 13L14.5 12H21.4844L21.5 13H14.5156Z"
                fill={ iconColor }
            />

            <Path 
                d="M18.5 21.25V18H8.5V19C8.5 20.5797 8.68062 21.2381 8.95187 21.7384C9.41219 22.5875 10.2456 23 11.5 23H19.5C19.5 23 18.5 22.375 18.5 21.25Z"
                fill={ iconColor }
            />
        </Svg>
    );
}