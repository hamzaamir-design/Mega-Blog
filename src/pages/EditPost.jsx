import React, { use, useEffect, useState} from 'react'
import { Container, Postform } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'
import { set } from 'react-hook-form'

function EditPost() {
  const [post, setPosts] = useState([])
  const {slug} = useParams()
  const navigate = useNavigate()
  useEffect(() => { 
    if (slug) {
      appwriteService.getPostBySlug(slug).then((post) => {
        if (post) {
          setPosts(post)
        }
      })
       
    } else {
      navigate('/')
    }
  },[slug, navigate])


  return post ? (
    <div className='py-8'>
      <Container>
        <Postform post={posts} />
      </Container>
    </div>
  ) : null
}

export default EditPost