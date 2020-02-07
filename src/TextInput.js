import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';


const TextBox = () => (
  <div> 
        <Formik
          initialValues={{Answer: ''}} 

          validate={values => {
            const errors = {}; 
            if(usedAnswer.has(values)){
              errors.Answer = "Already entered!";
            }
            else if(answer.has(values)){
              errors.Answer = "Invalid word!";
            }
            return(errors);
            }
          }

          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
        </Formik>
      </div>
  );

export default TextBox; 