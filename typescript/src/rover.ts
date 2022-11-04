export function rover(input: string): string {
  const listOfInstructions = input.split('\n');
  const mapSize = listOfInstructions[0].split(' ');
  const map: Map = {
    width: Number(mapSize[0]),
    height: Number(mapSize[1])
  };
  let initialPosition = keepPositionInBounds(mapToPosition(listOfInstructions[1]), map);

  while (initialPosition.coordinates.x < 0 || initialPosition.coordinates.y < 0) {
    initialPosition = keepPositionInBounds(initialPosition, map);
  }

  if (listOfInstructions.length < 3) {
    return mapFromPosition(initialPosition);
  }

  const instructions = listOfInstructions[2].split(' ');

  const finalPosition = instructions.reduce((position, instruction) => {
    return keepPositionInBounds(processInstruction(position, instruction), map);
  }, initialPosition);

  console.log(printPositionOnMap(finalPosition, map));

  return mapFromPosition(finalPosition);
}

export function processInstruction(initialPosition: Position, instruction: string): Position {
  if (['f', 'b'].includes(instruction)) {
    return processMoveInstruction(initialPosition, instruction);
  }
  return {
    ...initialPosition,
    facing: instruction
  };
}

function processMoveInstruction(initialPosition: Position, instruction: string) {
  const sign = ['n', 'e'].includes(initialPosition.facing) ? 1 : -1;
  const actualSign = instruction === 'f' ? sign : -sign;

  if (['n', 's'].includes(initialPosition.facing)) {
    return {
      ...initialPosition,
      coordinates: {
        ...initialPosition.coordinates,
        y: initialPosition.coordinates.y + actualSign
      }
    };
  }
  return {
    ...initialPosition,
    coordinates: {
      ...initialPosition.coordinates,
      x: initialPosition.coordinates.x + actualSign
    }
  };
}

function keepPositionInBounds(position: Position, map: Map): Position {
  return {
    ...position,
    coordinates: {
      x: (position.coordinates.x + map.width) % map.width,
      y: (position.coordinates.y + map.height) % map.height,
    }
  }
}

interface Map {
  width: number;
  height: number;
}

interface Coordinates {
  x: number;
  y: number;
}

export interface Position {
  coordinates: Coordinates;
  facing: string;
}

export function mapToPosition(input: string): Position {
  const processed = input.split(' ');
  return {
    coordinates: {
      x: Number(processed[0]),
      y: Number(processed[1]),
    },
    facing: processed[2]
  } as Position;
}

export function mapFromPosition(input: Position): string {
  return `${input.coordinates.x} ${input.coordinates.y} ${input.facing}`;
}

export function printPositionOnMap(position: Position, map: Map): string {
  const rover = roverIcon(position.facing);
  return Array(2 * map.height + 1).fill(0).map((_, inverseY: number) => {
    const y = 2 * map.height - inverseY;
    return Array(2 * map.width + 1).fill(0).map((_, x: number) => {
      if (y % 2 === 0) {
        return x % 2 === 0 ? '+' : '-';
      } else {
        return x % 2 === 0 ? '|' : isRoverHere(position.coordinates, x, y) ? rover : ' ';
      }
    }).join('');
  }).join('\n');
}

const isRoverHere = (coordinates: Coordinates, x: number, y: number): boolean => {
  return 2 * coordinates.x + 1 === x && 2 * coordinates.y + 1 === y;
};

const roverIcon = (facing: string): string => {
  switch (facing) {
    case 'n':
      return '▲';
    case 's':
      return '▼';
    case 'e':
      return '►';
    default:
      return '◀︎';
  }
};
