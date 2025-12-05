async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Failed to fetch countries");
  }
}

export default async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
}) {
  const countries = await getCountries();

  const flag =
    countries.find(
      (country) =>
        country.name.toLowerCase().trim() ===
        defaultCountry.toLowerCase().trim()
    )?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option>Select Country...</option>
      {countries.map((country) => (
        <option key={country.name} value={`${country.name}%${country.flag}`}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
