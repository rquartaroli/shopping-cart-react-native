import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
  Container,
  ImageItem,
  WrapperValue,
  ScrollTitleCard,
  TitleCard,
  TextCard,
  AddItem,
} from './styles';

interface Props extends RectButtonProps {
  pathImage: string;
  titleCard: string;
  valueCard: number;
  onPress: () => void;
}

export function CardItem({pathImage, titleCard, valueCard, onPress, ...rest}: Props) {
  return (
    <Container>
      <ImageItem source={{ uri: pathImage }} />

      <ScrollTitleCard>
        <TitleCard>{titleCard}</TitleCard>
      </ScrollTitleCard>
        
      <WrapperValue>
        <TextCard>R$ {valueCard}</TextCard>
        <AddItem onPress={onPress} {...rest}>
          <TextCard>+ Add</TextCard>
        </AddItem>
      </WrapperValue>
    </Container>
  )
}