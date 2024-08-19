"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Link from 'next/link';

const defaultFormState = {
  name: '',
  superPowers: '',
  about: '',
};

const JoinUs: React.FC = () => {
  const [cartoonImage, setCartoonImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState(defaultFormState);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraVisible, setCameraVisible] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const savedCartoonImage = localStorage.getItem('cartoonImage');
    const savedFormState = localStorage.getItem('formState');

    if (savedCartoonImage && savedFormState) {
      setCartoonImage(savedCartoonImage);
      setFormState(JSON.parse(savedFormState));
      setCameraVisible(false);
      setIsSubmitted(true);
    } else {
      startCamera();
    }
  }, []);

  const startCamera = () => {
    if (!cameraVisible || !navigator.mediaDevices) return;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Error accessing camera: ', err));
  };

  const takePictureAndCartoonize = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL('image/png');
    const file = dataURLtoFile(imageDataUrl, 'image.png');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', 'anime'); // Cartoon style

    setLoading(true);

    try {
      const response = await axios.post(
        'https://cartoon-yourself.p.rapidapi.com/facebody/api/portrait-animation/portrait-animation',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-rapidapi-host': process.env.NEXT_PUBLIC_CARTOON_API_HOST!,
            'x-rapidapi-key': process.env.NEXT_PUBLIC_CARTOON_API_KEY!,
          },
        }
      );
      const cartoonizedImage = response.data.data.image_url;
      setCartoonImage(cartoonizedImage);
      localStorage.setItem('cartoonImage', cartoonizedImage);
      setCameraVisible(false);
    } catch (error) {
      console.error('Error cartoonizing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] ?? '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleRetake = () => {
    localStorage.removeItem('cartoonImage');
    localStorage.removeItem('formState');
    setCartoonImage(null);
    setFormState(defaultFormState);
    setIsSubmitted(false);
    setCameraVisible(true);
    startCamera();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveDataToFirestore = async (data: any) => {
    try {
      const docRef = await addDoc(collection(db, 'superheroes'), data);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleSubmit = async () => {
    const userData = {
      name: formState.name,
      superPowers: formState.superPowers,
      about: formState.about,
      cartoonImage: cartoonImage,
    };

    await saveDataToFirestore(userData);
    localStorage.setItem('formState', JSON.stringify(userData));
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Стани част от нас!</h1>
        <p className="text-gray-600">Снимай се и се регистрирай, за да станеш част от нас и да можеш да участваш в нашия блог!</p>
      </motion.div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        <AnimatePresence>
          {cameraVisible && (
            <motion.div
              key="camera"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg flex flex-col items-center"
            >
              <div className="relative w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                <video ref={videoRef} className="rounded-lg w-full h-full object-cover" autoPlay playsInline />
              </div>
              <button
                onClick={takePictureAndCartoonize}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
                disabled={loading}
              >
                {loading ? 'Зареждане...' : 'Стани част от нас!'}
              </button>
              <canvas ref={canvasRef} className="hidden"></canvas>
            </motion.div>
          )}
        </AnimatePresence>

        {cartoonImage && (
          <motion.div
            key="cartoon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg"
          >
            <div className="w-full h-64 bg-red-200 rounded-md flex items-center justify-center">
              <img src={cartoonImage} alt="Cartoonized" className="rounded-lg w-full h-full object-cover" />
            </div>

            {isSubmitted ? (
              <div className="mt-4">
                <h3 className="text-gray-700 text-xl font-semibold">Име:</h3>
                <p>{formState.name}</p>
                <h3 className="text-gray-700 text-xl font-semibold">Супер сили:</h3>
                <p>{formState.superPowers}</p>
                <h3 className="text-gray-700 text-xl font-semibold">Малко за мен:</h3>
                <p>{formState.about}</p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href="/blog"
                    className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                  >
                    Виж другите
                  </Link>
                </motion.div>
              </div>
            ) : (
              <div>
                <div className="mt-4">
                  <label className="block text-gray-700">Име:</label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border rounded-lg"
                    placeholder="Вашето име"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Супер сили:</label>
                  <input
                    type="text"
                    name="superPowers"
                    value={formState.superPowers}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border rounded-lg"
                    placeholder="Вашите супер сили"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700">Малко за мен:</label>
                  <textarea
                    name="about"
                    value={formState.about}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border rounded-lg"
                    placeholder="Разкажете ни нещо за себе си"
                  ></textarea>
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                  >
                    Запиши
                  </button>
                  <button
                    onClick={handleRetake}
                    className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                  >
                    Повтори
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default JoinUs;
