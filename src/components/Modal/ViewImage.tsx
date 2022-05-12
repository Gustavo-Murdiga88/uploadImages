import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="3xl">
      <ModalOverlay />
      <ModalContent bg="pGray.800" borderRadius="md">
        <ModalBody p="0">
          <Image
            src={imgUrl}
            alt="teste"
            w="100%"
            h="100%"
            maxW="900px"
            maxH="600px"
          />
        </ModalBody>
        <ModalFooter
          px="2"
          justifyContent="start"
          borderBottomRadius="md"
          alignItems="center"
          bg="pGray.800"
        >
          <Link href={imgUrl} target="_blank" fontWeight="bold">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
