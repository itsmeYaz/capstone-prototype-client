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
  date: z.string().transform((dateString) => new Date(dateString)),
  quantity: z
    .string()
    .transform((val) => Number(val))
    .refine((value) => value >= 0),
  productionId: z.string(),
})

const AddHarvest = () => {
  const { id } = useParams()
  const [inputData, setInputData] = useState({
    date: new Date().toISOString(),
    quantity: 0,
    productionId: id,
  })

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: 2022 - 11 - 14,
      quantity: 0,
      productionId: id,
    },
  })

  console.log(typeof id)

  function onSubmit() {
    axios
      .post(
        'https://capstone.prototype.nielmascarinas.me/api/harvest',
        inputData,
      )
      .then((res) => {
        console.log('Response:', res)
        navigate(`/production/${id}`)
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
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({ ...inputData, date: e.target.value })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        quantity: Number(e.target.value),
                      })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="secondary">
            Add Harvest
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default AddHarvest
