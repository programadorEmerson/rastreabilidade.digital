import { FC } from 'react';

import AnimatedText from 'react-animated-text-content';

type AnimatedWordsProps = {
  text: string;
};

const AnimatedWords: FC<AnimatedWordsProps> = ({ text }) => {
  return (
    <AnimatedText
      type="words" // animate words or chars
      animation={{
        x: '200px',
        y: '-20px',
        scale: 1.1,
        ease: 'ease-in-out',
      }}
      animationType="wave"
      interval={0.1}
      duration={0.5}
      tag="h3"
      className="animated-paragraph"
      includeWhiteSpaces
      threshold={0.1}
      rootMargin="20%"
    >
      {text}
    </AnimatedText>
  );
};

export default AnimatedWords;
