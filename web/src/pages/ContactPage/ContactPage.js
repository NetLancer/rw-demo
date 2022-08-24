//import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web' 
import { toast, Toaster } from '@redwoodjs/web/toast' 

import { FieldError, FormError, Form, TextField, TextAreaField, Label, Submit } from '@redwoodjs/forms' 
import { useForm } from 'react-hook-form'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => { 
  // 
  const formMethods = useForm({ mode: 'onBlur' }) 
  
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thanx though successfull submit!') 
      formMethods.reset() 
    },
  })
  
  const onSubmit = (data) => {
    create({ variables: { input: data } }) 
  }
  
  ///////////////
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <h1>ContactPage Form</h1>
      
      <Form formMethods={formMethods} onSubmit={onSubmit} config={{ mode: 'onBlur' }} error={error}> 
        <FormError error={error} wrapperClassName='form-error' />
        <Label name="name" errorClassName="blueerr">
          Name
        </Label>
        <TextField 
          name="name" 
          validation={{ required: true }} 
          errorClassName="error"
          />
        <FieldError name="name" className="error" />
        
        <Label name="email" errorClassName="error">
          E-mail
        </Label>
        <TextField 
          name="email" 
          validation={{
            required: true, 
            pattern: {
            value: /^[^@]+@[^.]+\..+$/,
            message: 'Only valid email address(!)',
            }, 
          }} 
          errorClassName="error"
          />
        <FieldError name="email" className="error" />
        
        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField 
          name="message" 
          validation={{ required: true }} 
          errorClassName="error"
          /> 
        <FieldError name="message" className="error" />
        
        <Submit disabled={loading}>{loading ? 'saving..' : 'Save'}</Submit>
      </Form>
    </>
  )
}

export default ContactPage
