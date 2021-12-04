import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography } from '@mui/material';
// utils
import mockData from '../../../utils/mock-data';
//
import { varFadeInRight, MotionContainer } from '../../animate';
import { CarouselControlsPaging1, CarouselControlsArrowsBasic1 } from '../../carousel';

// ----------------------------------------------------------------------

const TITLES = ['새로오신 분들을 위한 영상', '비중 1위 종목', '좀 지켜보며 천천히 합류하세요'];
const TEXTS = [
  '이번달의 오리엔테이션 방문하기',
  '현재 회원들의 비중 1위 종목에 대한 리뷰방송을  3거래일마다 한번씩 하고 있습니다.',
  '2주정도는 거래보다는 적응에 집중하기를 권장합니다.'
];
const LINKS = ['https://youtu.be/DgRdP9JNWYg', '#', '#'];

const MOCK_APPS = [...Array(3)].map((_, index) => ({
  id: mockData.id(index),
  title: TITLES[index],
  description: TEXTS[index],
  image: mockData.image.feed(index),
  link: LINKS[index]
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  height: 280,
  width: '100%',
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive }) {
  const { image, title, description, link } = item;

  function handleOnclick(link) {
    if (link === '#') return;
    window.open(link, '_blank');
  }

  return (
    <Box sx={{ position: 'relative' }} onClick={() => handleOnclick(link, '_blank')}>
      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
        }}
      />
      <CarouselImgStyle alt={title} src={image} />
      <CardContent
        sx={{
          bottom: 0,
          width: 1,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <MotionContainer open={isActive}>
          <motion.div variants={varFadeInRight}>
            {/* <Typography
                variant="overline"
                sx={{
                  mb: 1,
                  opacity: 0.48,
                  display: 'block'
                }}
              >
                Featured App
              </Typography> */}
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Typography variant="h5" gutterBottom noWrap>
              {title}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Typography variant="body2" noWrap>
              {description}
            </Typography>
          </motion.div>
        </MotionContainer>
      </CardContent>
    </Box>
  );
}

export default function AppFeatured() {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? MOCK_APPS.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
    ...CarouselControlsPaging1({
      color: 'primary.main',
      sx: {
        top: theme.spacing(3),
        left: theme.spacing(3),
        bottom: 'auto',
        right: 'auto'
      }
    })
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {MOCK_APPS.map((app, index) => (
          <CarouselItem key={app.id} item={app} isActive={index === currentIndex} link={app.link} />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic1 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}
