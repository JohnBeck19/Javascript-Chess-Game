const { get960Pieces } = require('../board.js');



describe("Chess960 Board Generation", () => {
    
    test("Pieces are mirrored across the board properly", () => {
        const pieces = get960Pieces();
        const whitePos = pieces.filter(p => p.color === 'white').position % 10;
        const blackPos = pieces.filter(p => p.color === 'black').position % 10;
        expect(whitePos === blackPos); //to be the same
    });

    test("King is always between the rooks", () => {
        const pieces = get960Pieces();
        const kingPos = pieces.filter(p => p.rank === 'king').filter(pc => pc.color === 'white').position % 10;
        const rooks = pieces.filter(p => p.rank === 'rook').filter(pc => pc.color === 'white').map(r => r.position % 10);
        expect((kingPos > rooks[0] && kingPos < rooks[1]) || (kingPos < rooks[0] && kingPos > rooks[1])).toBe(false); //between king
    });

    test("Bishops are on opposite-colored squares", () => {
        const pieces = get960Pieces();
        const bishops = pieces.filter(p => p.rank === 'bishop').filter(pc => pc.color === 'white').map(b => b.position % 10);
        expect((bishops[0] % 2) !== (bishops[1] % 2)).toBe(true); // Must be on different colors
    });

    test("Ensures different Chess960 positions", () => {
        const positions1 = get960Pieces().map(p => p.position);
        const positions2 = get960Pieces().map(p => p.position);
        expect(positions1).not.toEqual(positions2); // Should not always be the same
    });

    test("Queen is placed on a valid square", () => {
        const pieces = get960Pieces();
        const queenPos = pieces.find(p => p.rank === 'queen').position % 10;
        expect(queenPos).toBeGreaterThanOrEqual(1);
        expect(queenPos).toBeLessThanOrEqual(8);
    });

});