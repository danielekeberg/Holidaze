export default function Footer() {
    const now = new Date();
    const year = now.getFullYear();
    return(
        <div className="border-t border-neutral-400 p-10 mt-20 text-center">
            <p>&copy; Holidaze {year}</p>
        </div>
    )
}