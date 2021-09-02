import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { 
  Container,
  Content,
  WrapperDialog,
  Title,
  Description,
  WrapperButtons,
  TitleButtons,
  NegativeButton,
  PositiveButton,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
  description?: string;
  titleButtonNegative: string;
  titleButtonPositive: string;
  actionButtonNegative: () => void;
  actionButtonPositive: () => void;
}

export function Dialog({
  title, 
  description, 
  titleButtonNegative, 
  titleButtonPositive,
  actionButtonNegative,
  actionButtonPositive
  }: Props) {

  return (
    <Container>
      <Content>
        <WrapperDialog>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </WrapperDialog>

        <WrapperButtons>
          <NegativeButton onPress={actionButtonNegative}>
            <TitleButtons>{titleButtonNegative}</TitleButtons>
          </NegativeButton>

          <PositiveButton onPress={actionButtonPositive}>
            <TitleButtons>{titleButtonPositive}</TitleButtons>
          </PositiveButton>
        </WrapperButtons>

      </Content>
    </Container>
  )
}