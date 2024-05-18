import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const FormSchema = z.object({
  farmLocation: z.string(),
  farmArea: z
    .string()
    .transform((val) => Number(val))
    .refine((value) => value >= 0),
  farmCategory: z.string(),
  farmerId: z.string(),
})

const AddGeographical = () => {
  const { id } = useParams()
  const [inputData, setInputData] = useState({
    farmLocation: '',
    farmArea: 0,
    farmCategory: '',
    farmerId: id,
  })

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      farmLocation: '',
      farmArea: 0,
      farmCategory: '',
      farmerId: id,
    },
  })

  function onSubmit() {
    axios
      .post(
        'https://capstone.prototype.nielmascarinas.me/api/geographical',
        inputData,
      )
      .then((res) => {
        console.log('Response:', res)
        navigate(`/farmer/${id}`)
      })
      .catch((err) => console.log('Error:', err))
  }

  return (
    <div className="w-[70%] grid place-items-center mt-16">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="farmLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Location</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        farmLocation: e.target.value,
                      })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="farmArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Area</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        farmArea: Number(e.target.value),
                      })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="farmCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Category</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        farmCategory: e.target.value,
                      })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default AddGeographical
