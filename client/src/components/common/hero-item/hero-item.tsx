import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DefaultSuperheroImage from '@assets/images/default-superhero.png';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { Superhero } from '@common/types';
import { ModalDeleteHero } from '@components/common';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import { useDeleteHeroMutation } from '@store/query/hero/hero';

const HeroItem: React.FC<Superhero> = ({ id, nickname, images }) => {
  const [openDeleteHero, setOpenDeleteHero] = useState(false);
  const [deleteHero] = useDeleteHeroMutation();
  const navigate = useNavigate();

  const onShowMore = (): void => {
    const route = AppRoute.HERO.replace(/:id/g, id);
    navigate(route);
  };

  const onEdit = (): void => {
    const route = AppRoute.EDIT.replace(/:id/g, id);
    navigate(route);
  };

  const onDelete = async (): Promise<void> => {
    await deleteHero(id);
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={(images?.length && images[0].url) || DefaultSuperheroImage}
          alt={nickname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nickname}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size={'medium'} variant="contained" onClick={onShowMore}>
            Show More
          </Button>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={(): void => setOpenDeleteHero(true)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <ModalDeleteHero
        isOpen={openDeleteHero}
        handleCloseDialog={(): void => setOpenDeleteHero(false)}
        handleDeleteHero={onDelete}
      />
    </Container>
  );
};

export { HeroItem };
