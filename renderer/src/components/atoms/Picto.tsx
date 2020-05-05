import React from 'react';

// .import svgs
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as GearIcon } from '../../assets/icons/gear.svg';
import { ReactComponent as ArrowDownIcon } from '../../assets/icons/arrow_down.svg';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import { ReactComponent as ArrowBackIcon } from '../../assets/icons/arrow_back.svg';
import { ReactComponent as TickIcon } from '../../assets/icons/tick.svg';
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg';
import { ReactComponent as PeopleIcon } from '../../assets/icons/people.svg';
import { ReactComponent as SubscribeIcon } from '../../assets/icons/subscribe.svg';
import { ReactComponent as UnsubscribeIcon } from '../../assets/icons/unsubscribe.svg';
import { ReactComponent as NoImageIcon } from '../../assets/icons/noimage.svg';
import { ReactComponent as FilterIcon } from '../../assets/icons/filter.svg';
import { ReactComponent as VideoIcon } from '../../assets/icons/video.svg';

type SizeType = number | string;

interface PropsSvg {
  width: SizeType;
  height: SizeType;
  color?: string;
}

interface Props extends PropsSvg {
  icon: string;
}

interface SvgsType {
  [key: string]: React.ElementType<PropsSvg>;
}

const svgs: SvgsType = {
  search: SearchIcon,
  gear: GearIcon,
  arrowDown: ArrowDownIcon,
  add: AddIcon,
  arrowBack: ArrowBackIcon,
  tick: TickIcon,
  eye: EyeIcon,
  people: PeopleIcon,
  subscribe: SubscribeIcon,
  unsubscribe: UnsubscribeIcon,
  noimage: NoImageIcon,
  filter: FilterIcon,
  video: VideoIcon
};

const Picto: React.SFC <Props> = props => {
  const {
    icon,
    width,
    height,
    color
  } = props;
  const Svg: React.ElementType = svgs[icon];

  if(Svg)
    return <Svg width={width} height={height} color={color} />
  return null;
}

export default Picto;