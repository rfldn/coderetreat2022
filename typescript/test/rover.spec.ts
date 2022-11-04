import { mapFromPosition, mapToPosition, Position, printPositionOnMap, processInstruction, rover } from '../src/rover';

describe('check rover', () => {

  describe("test rover function with multiple movements", () => {
    it("should return the new position of the rover - fb", () => {
      expect(rover('5 6\n2 3 e\nf b')).toBe("2 3 e");
    });
    it("should return the new position of the rover - ff", () => {
      expect(rover('5 5\n2 3 e\nf f')).toBe("4 3 e");
    });
  });

  describe("test rover function", () => {
    it("should return a position of the rover", () => {
      expect(rover('4 5\n2 3 e')).toBe("2 3 e");
    });
    it("should return another position of the rover", () => {
      expect(rover('4 5\n2 3 e\nf')).toBe("3 3 e");
    });
    it("should return yet another position of the rover", () => {
      expect(rover('6 6\n1 2 e\nf f n f s')).toBe("3 3 s");
    });
  });

  describe('check map boundaries', () => {
    it('should never go past boundaries', () => {
      expect(rover('3 3\n2 2 e\nf')).toBe("0 2 e");
    });
    it('should never start outside boundaries', () => {
      expect(rover('3 3\n8 7 e')).toBe("2 1 e");
    });
    it('should never start outside boundaries - negative space', () => {
      expect(rover('3 3\n-8 -7 e')).toBe("1 2 e");
    });
  });

  describe('test position mapper', function () {
    it('convert to position', () => {
      expect(mapToPosition('0 0 n')).toEqual(createPosition(0, 0, 'n'));
    });
    it('convert to another position', () => {
      expect(mapToPosition('2 3 e')).toEqual(createPosition(2, 3, 'e'));
    });
    it('convert from position', () => {
      expect(mapFromPosition(createPosition(2, 3, 'e'))).toEqual('2 3 e');
    });
  });

  describe('process move instruction', () => {
    it('move forward from 0 0 e', () => {
      expect(processInstruction(createPosition(0, 0, 'e'), 'f'))
        .toEqual(createPosition(1, 0, 'e'));
    });
    it('move forward from 2 2 e', () => {
      expect(processInstruction(createPosition(2, 2, 'e'), 'f'))
        .toEqual(createPosition(3, 2, 'e'));
    });
    it('move forward from 0 0 n', () => {
      expect(processInstruction(createPosition(0, 0, 'n'), 'f'))
        .toEqual(createPosition(0, 1, 'n'));
    });
    it('move backward from 0 0 n', () => {
      expect(processInstruction(createPosition(0, 0, 'n'), 'b'))
        .toEqual(createPosition(0, -1, 'n'));
    });
    it('move backward from 0 0 w', () => {
      expect(processInstruction(createPosition(0, 0, 'w'), 'f'))
        .toEqual(createPosition(-1, 0, 'w'));
    });
  });

  describe('process orientation instruction', () => {
    it('change orientation to face north', () => {
      expect(processInstruction(createPosition(0, 0, 'e'), 'n'))
        .toEqual(createPosition(0, 0, 'n'));
    });
  });

  describe('map printer', () => {
    it('print empty map', () => {
      expect(printPositionOnMap(createPosition(-1, -1, 'n'), {width: 3, height: 4})).toEqual(
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+');
    });
    it('print map with rover in 0,0', () => {
      expect(printPositionOnMap(createPosition(0, 0, 'n'), {width: 3, height: 4})).toEqual(
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '|▲| | |\n' +
        '+-+-+-+');
    });
    it('print map with rover in 2,2', () => {
      expect(printPositionOnMap(createPosition(2, 2, 'n'), {width: 3, height: 4})).toEqual(
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '| | |▲|\n' +
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+\n' +
        '| | | |\n' +
        '+-+-+-+');
    });
  });

});

const createPosition = (x: number, y: number, facing: string): Position => ({
  coordinates: {
    x,
    y,
  },
  facing
});
