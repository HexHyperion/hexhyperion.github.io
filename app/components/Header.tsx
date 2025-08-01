export default function Header({ selectedIndex }: { selectedIndex: number }) {
    return (
        <header>
            <a href="/" className={selectedIndex === 0 ? "active" : ""}>HOME</a>
            <a href="/repos" className={selectedIndex === 1 ? "active" : ""}>cs_projects</a>
            <a href="/photos" className={selectedIndex === 2 ? "active" : ""}>my_photos</a>
        </header>
    );
}