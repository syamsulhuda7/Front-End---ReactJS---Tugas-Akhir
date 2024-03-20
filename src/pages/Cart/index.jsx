import { useState } from "react";

function Questionnaire() {
  // State untuk menyimpan jawaban dari pengguna
  const [answer, setAnswer] = useState('');

  // Fungsi untuk menangani perubahan jawaban
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // Fungsi untuk menangani pengiriman jawaban
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan jawaban, misalnya kirim ke server atau simpan di state induk
    console.log('Jawaban Anda:', answer);
  };

  return (
    <div>
      <h2>Kuisioner</h2>
      <form onSubmit={handleSubmit}>
        <div style={{}}>
          <label>
            <input
              type="radio"
              value="1"
              checked={answer === '1'}
              onChange={handleAnswerChange}
            />
            Pilihan 1
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="option2"
              checked={answer === 'option2'}
              onChange={handleAnswerChange}
            />
            Pilihan 2
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="option3"
              checked={answer === 'option3'}
              onChange={handleAnswerChange}
            />
            Pilihan 3
          </label>
        </div>
        <button type="submit">Kirim Jawaban</button>
      </form>
    </div>
  );
}

export default Questionnaire;
