import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

type FormPost = {
  title: string;
  description: string;
  url: string;
};
export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      // TODO REQUIRED, LESS THAN 10 MB AND ACCEPTED FORMATS VALIDATIONS
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: image =>
          image[0].size <= 81920 || `O arquivo deve ser menor que 10MB`,
        acceptedFormats: image =>
          /.\.*(png|jpeg|jpg|gif)$/i.test(image[0].type) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF.',
      },
    },
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: 'Titulo obrigatório',
      minLength: {
        value: 2,
        message: 'minimo de',
      },
      maxLength: {
        value: 20,
        message: 'maximo de',
      },
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: 'Descrição obrigatória',
      maxLength: { value: 65, message: 'maximo de ' },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (images: FormPost) => {
      const reponse = api.post('/api/images', {
        ...images,
      });
      return reponse;
    },
    // TODO MUTATION API POST REQUEST,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('images');
        toast({
          title: 'Sucesso',
          description: 'Sucesso.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      // TODO ONSUCCESS MUTATION
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      const FormData = {
        title: data.title,
        description: data.description,
        url: imageUrl,
      } as FormPost;

      mutation.mutateAsync(FormData);

      if (!FormData.url) {
        toast({
          title: 'Url não existe',
          description: 'Url não existe.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch (err) {
      toast({
        title: err,
        description: err,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset({
        image: null,
        descriptionImage: '',
        descriptionTitle: '',
      });
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          name="image"
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder="Título da imagem..."
          name="title"
          {...register('title', formValidations.title)}
          error={errors.title}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          name="descriptionImage"
          {...register('description', formValidations.description)}
          error={errors.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
