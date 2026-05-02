import { useState } from 'react';

export default function Content({ tableData }) {
  const [query, setQuery] = useState('');

  const filteredRows = tableData.filter((row) =>
    row.service.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="content">
      <h2>Наші послуги</h2>
      <label className="filter-label" htmlFor="service-filter">
        Фільтр за назвою послуги:
      </label>
      <input
        id="service-filter"
        className="filter-input"
        type="text"
        placeholder="Введіть назву..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Послуга</th>
            <th>Вартість</th>
            <th>Сезон</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <tr key={row.id}>
              <td>{row.service}</td>
              <td>{row.price}</td>
              <td>{row.season}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
