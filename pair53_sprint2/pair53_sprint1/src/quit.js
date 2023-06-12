export function quitPage() {
    return `
<h2>Do you really want to quit?</h2>

<button onclick="renderEndPage()">Yes</button>
<button onclick="renderGamePage()">No</button>
`;
}
