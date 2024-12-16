import React, { Dispatch, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const SwipeCards = () => {
  const [cards, setCards] = useState<Card[]>(cardData);

  return (
    <div
      style={{
        position: 'relative',
        width: '450px',
        height: '550px',
        margin: 'auto',
        marginTop: '5%',
      }}
    >
      {cards.map((card, index) => (
        <CardItem
          key={card.id}
          cards={cards}
          setCards={setCards}
          {...card}
          index={index} // Pass index to manage z-index for stacked cards
        />
      ))}
    </div>
  );
};

const CardItem = ({
  id,
  name,
  description,
  image,
  cards,
  setCards,
  index,
}: {
  id: string;
  name: string;
  description: string;
  image: string;
  setCards: Dispatch<React.SetStateAction<Card[]>>;
  cards: Card[];
  index: number;
}) => {
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const rotate = useTransform(x, [-100, 0, 100], [-18, 0, 18]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 50) {
      setCards((pv) => pv.filter((v) => v.id !== id));
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute', // Stack the cards on top of each other
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: cards.length - index, // Higher z-index for the topmost card
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.img
        src={image}
        alt={name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '16px',
          cursor: 'grab',
          x,
          opacity,
          rotate,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
      />
    </motion.div>
  );
};

export default SwipeCards;

type Card = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const cardData: Card[] = [
  {
    id: '1',
    name: 'Lamp',
    description: 'A modern desk lamp with a sleek design.',
    image:
      'https://m.media-amazon.com/images/I/61uLmGqbcVL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: '2',
    name: 'Desk',
    description: 'A wooden desk for your workspace.',
    image:
      'https://m.media-amazon.com/images/S/al-na-9d5791cf-3faf/1c05d022-41c2-4072-8915-f3ac72780be0._SL480_.jpg',
  },
  {
    id: '3',
    name: 'Chair',
    description: 'An ergonomic chair for your workspace.',
    image:
      'https://m.media-amazon.com/images/I/812Dxg5J9CL._AC_UF1000,1000_QL80_.jpg',
  },
];
