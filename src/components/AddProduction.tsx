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
  datePlanted: z.string().transform((dateString) => new Date(dateString)),
  cropPlanted: z.string(),
  areaPlanted: z
    .string()
    .transform((val) => Number(val))
    .refine((value) => value >= 0),
  existence: z.string(),
  dateHarvest: z.string().transform((dateString) => new Date(dateString)),
  status: z.string(),
  farmerId: z.string(),
})

const AddProduction = () => {
  const { id } = useParams()
  const [inputData, setInputData] = useState({
    datePlanted: new Date().toISOString(),
    cropPlanted: '',
    areaPlanted: '',
    existence: '',
    dateHarvest: new Date().toISOString(),
    status: '',
    farmerId: id,
  })

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datePlanted: '2024-05-29',
      cropPlanted: '',
      areaPlanted: '',
      existence: '',
      dateHarvest: '2024-05-29',
      status: '',
      farmerId: id,
    },
  })

  console.log(inputData)

  function onSubmit() {
    axios
      .post(
        'https://capstone.prototype.nielmascarinas.me/api/production',
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
            name="datePlanted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Planted</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="date"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        datePlanted: e.target.value,
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
            name="cropPlanted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Crop Planted</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        cropPlanted: e.target.value,
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
            name="areaPlanted"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area Planted</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        areaPlanted: Number(e.target.value),
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
            name="existence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Existence</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({ ...inputData, existence: e.target.value })
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateHarvest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Harvest</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    required
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({
                        ...inputData,
                        dateHarvest: e.target.value,
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
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    required
                    onChange={(e) => {
                      field.onChange(e)
                      setInputData({ ...inputData, status: e.target.value })
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

export default AddProduction
