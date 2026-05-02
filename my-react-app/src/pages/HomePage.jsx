import './HomePage.css';

export default function HomePage() {
  return (
    <section className="accomondation" id="accomondation">
      <h2 className="accomondation-title">Наші номери</h2>

      <div className="accomondation-grid">
        <article className="room-card" data-room-card>
          <img
            src="/images/gallery/kimnata1.jpg"
            alt="Сімейний номер"
            className="room-card-image"
          />

          <div className="room-card-body">
            <h3 className="room-card-title">Сімейний номер</h3>

            <ul className="room-card-description">
              <li>Власний вихід на терасу та вид на озеро.</li>
              <li>Місткість: 👥 2 особи</li>
              <li>Зручності: окремий вхід, BBQ, звукоізоляція.</li>
              <li>Ціна: 2 350 грн</li>
            </ul>

            <button type="button" className="room-card-button" data-room-button>
              Забронювати
            </button>

            <p className="room-card-more" data-room-more hidden>
              Просторий номер з окремою зоною відпочинку, ортопедичними ліжками
              та великим балконом.
            </p>
          </div>
        </article>

        <article className="room-card" data-room-card>
          <img
            src="/images/gallery/kimnata2.jpg"
            alt="Стандартний номер"
            className="room-card-image"
          />

          <div className="room-card-body">
            <h3 className="room-card-title">Стандартний номер</h3>

            <ul className="room-card-description">
              <li>До 2 гостей</li>
              <li>Телевізор та Wi-Fi</li>
              <li>Сучасна ванна кімната</li>
              <li>Ціна: 1 800 грн</li>
            </ul>

            <button type="button" className="room-card-button" data-room-button>
              Забронювати
            </button>

            <p className="room-card-more" data-room-more hidden>
              Затишний номер для парного відпочинку з комфортним ліжком,
              робочим столом і шафою.
            </p>
          </div>
        </article>

        <article className="room-card" data-room-card>
          <img
            src="/images/gallery/kimnata3.jpg"
            alt="Покращений номер"
            className="room-card-image"
          />

          <div className="room-card-body">
            <h3 className="room-card-title">Покращений номер</h3>

            <ul className="room-card-description">
              <li>Панорамні вікна</li>
              <li>Кондиціонер</li>
              <li>Міні-бар</li>
              <li>Ціна: 2 700 грн</li>
            </ul>

            <button type="button" className="room-card-button" data-room-button>
              Забронювати
            </button>

            <p className="room-card-more" data-room-more hidden>
              Ідеальний варіант для тривалого проживання: більше простору,
              додаткові меблі та тиха атмосфера.
            </p>
          </div>
        </article>

        <article className="room-card" data-room-card>
          <img
            src="/images/gallery/kimnata4.jpg"
            alt="Люкс"
            className="room-card-image"
          />

          <div className="room-card-body">
            <h3 className="room-card-title">Люкс</h3>

            <ul className="room-card-description">
              <li>Окрема спальня</li>
              <li>Преміум сервіс</li>
              <li>Зона для роботи</li>
              <li>Ціна: 3 500 грн</li>
            </ul>

            <button type="button" className="room-card-button" data-room-button>
              Забронювати
            </button>

            <p className="room-card-more" data-room-more hidden>
              Номер найвищого класу з покращеним інтер'єром, м'якими меблями й
              додатковими зручностями.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}