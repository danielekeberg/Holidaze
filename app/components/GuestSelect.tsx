export default function GuestSelect({ maxGuests }: { maxGuests: number }) {
    return (
        <>
        {Array.from({ length: maxGuests }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} {i + 1 === 1 ? "guest" : "guests"}
          </option>
        ))}
        </>
    )
}