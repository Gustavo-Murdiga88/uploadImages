import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const [urlImageModal, setUrlImageModal] = useState('');
  const { onClose, onOpen, isOpen } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const OpenImage = (urlImage: string): void => {
    if (urlImage) {
      setUrlImageModal(urlImage);
      onOpen();
    }
  };
  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(item => (
          <Card data={item} viewImage={OpenImage} key={item.ts} />
        ))}
      </SimpleGrid>
      <ModalViewImage
        imgUrl={urlImageModal}
        isOpen={isOpen}
        onClose={onClose}
      />
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
