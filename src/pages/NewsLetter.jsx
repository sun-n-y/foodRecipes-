import axios from 'axios';
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const newLetterUrl = 'https://www.course-api.com/cocktails-newsletter';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await axios.post(newLetterUrl, data);
  toast.success(response.data.msg);
  return redirect('/');
};

const NewsLetter = () => {
  return (
    <Form className="form" method="POST">
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        our newsletter
      </h4>
      {/* name */}
      <div className="form-row">
        <label htmlFor="name" className="form-label">
          first name
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          defaultValue="tim"
        />
      </div>
      {/* last name */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          defaultValue="jr"
        />
      </div>
      {/* name */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          e-mail
        </label>
        <input
          type="text"
          className="form-input"
          name="email"
          id="email"
          defaultValue="test@test.com"
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: '.5rem' }}
      >
        submit
      </button>
    </Form>
  );
};
export default NewsLetter;
