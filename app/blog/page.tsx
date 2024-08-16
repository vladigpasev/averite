"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import * as Bytescale from "@bytescale/upload-widget";
import JoinUs from "../components/joinus";

interface Article {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  author?: string;
  superPowers?: string;
  avatar?: string;
  createdAt?: Date;
}

interface UserInfo {
  name: string;
  superPowers: string;
  avatar: string;
}

function articleToFirestoreData(article: Article): { [key: string]: any } {
  return {
    title: article.title,
    description: article.description,
    imageUrl: article.imageUrl,
    author: article.author,
    superPowers: article.superPowers,
    avatar: article.avatar,
    createdAt: article.createdAt,
  };
}

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState<Article>({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const API_KEY = "public_FW25cAdFP55Fs9bcTAcYAr83uxvY";

  useEffect(() => {
    const savedAvatar = localStorage.getItem("cartoonImage");
    const savedFormState = localStorage.getItem("formState");

    if (savedAvatar && savedFormState) {
      const user = JSON.parse(savedFormState);
      setUserInfo({
        name: user.name,
        superPowers: user.superPowers,
        avatar: savedAvatar,
      });
    }

    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        
        const articlesList: Article[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title ?? "Untitled",
            description: data.description ?? "",
            imageUrl: data.imageUrl ?? "",
            author: data.author ?? "",
            superPowers: data.superPowers ?? "",
            avatar: data.avatar ?? "",
            createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000) : new Date(),
          } as Article;
        });

        setArticles(articlesList);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    fetchArticles();
  }, []);

  const handleFileUpload = useCallback(() => {
    const options = {
      apiKey: API_KEY,
      maxFileCount: 1,
    };

    Bytescale.UploadWidget.open(options)
      .then((files) => {
        const fileUrl = files[0]?.fileUrl || "";
        if (fileUrl) {
          setNewArticle((prev) => ({ ...prev, imageUrl: fileUrl }));
          alert(`File uploaded successfully:\n\n${fileUrl}`);
        } else {
          alert("No file selected.");
        }
      })
      .catch((error) => {
        alert(`Error uploading file: ${error}`);
      });
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setNewArticle((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const addOrEditArticle = useCallback(async () => {
    setLoading(true);

    try {
      if (editingArticle?.id) {
        const articleRef = doc(db, "articles", editingArticle.id);
        await updateDoc(articleRef, articleToFirestoreData(newArticle));

        setArticles((prev) =>
          prev.map((article) =>
            article.id === editingArticle.id ? { ...article, ...newArticle } : article
          )
        );
      } else {
        const articleData: Article = {
          ...newArticle,
          author: userInfo?.name,
          superPowers: userInfo?.superPowers,
          avatar: userInfo?.avatar,
          createdAt: new Date(),
        };

        const docRef = await addDoc(collection(db, "articles"), articleToFirestoreData(articleData)); 

        setArticles((prev) => [...prev, { ...articleData, id: docRef.id }]);
      }

      setShowModal(false);
      setEditingArticle(null);
      setNewArticle({ title: "", description: "", imageUrl: "" });
    } catch (error) {
      console.error("Error adding/editing article: ", error);
    } finally {
      setLoading(false);
    }
  }, [editingArticle, newArticle, userInfo]);

  const handleEditArticle = useCallback((article: Article) => {
    setEditingArticle(article);
    setNewArticle({
      title: article.title,
      description: article.description,
      imageUrl: article.imageUrl,
    });
    setShowModal(true);
  }, []);

  const handleDeleteArticle = useCallback(async (articleId: string) => {
    try {
      await deleteDoc(doc(db, "articles", articleId));

      setArticles((prev) => prev.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error("Error deleting article: ", error);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setEditingArticle(null);  
    setNewArticle({ title: "", description: "", imageUrl: "" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {!userInfo && <JoinUs />}

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-gray-800 mb-10"
      >
        Блог на Аверите
      </motion.h1>

      {userInfo && (
        <motion.button
          onClick={() => setShowModal(true)}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
        >
          Добави нова статия
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl"
      >
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            index={index}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
            userInfo={userInfo}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <ArticleModal
            newArticle={newArticle}
            loading={loading}
            onChange={handleChange}
            onUploadFile={handleFileUpload}
            onSave={addOrEditArticle}
            onClose={handleCloseModal}  
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface ArticleCardProps {
  article: Article;
  index: number;
  onEdit: (article: Article) => void;
  onDelete: (articleId: string) => void;
  userInfo: UserInfo | null;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index, onEdit, onDelete, userInfo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={article.avatar}
            alt={article.author}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{article.author}</h3>
            <p className="text-sm text-gray-600">{article.superPowers}</p>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {article.title}
        </h2>
        <p className="mt-2 text-gray-600">{article.description}</p>

        {article.author === userInfo?.name && (
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={() => onEdit(article)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Редактирай
            </button>
            <button
              onClick={() => onDelete(article.id!)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Изтрий
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface ArticleModalProps {
  newArticle: Article;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onUploadFile: () => void;
  onSave: () => void;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  newArticle,
  loading,
  onChange,
  onUploadFile,
  onSave,
  onClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          {newArticle.title ? "Редактирай статия" : "Добави нова статия"}
        </h2>
        <input
          type="text"
          name="title"
          value={newArticle.title}
          onChange={onChange}
          placeholder="Заглавие на статията"
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
        />
        <textarea
          name="description"
          value={newArticle.description}
          onChange={onChange}
          placeholder="Описание"
          className="w-full border border-gray-300 p-2 rounded-lg mb-4"
        />
        <button
          onClick={onUploadFile}
          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 mb-4"
        >
          Качи снимка
        </button>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Отказ
          </button>
          <button
            onClick={onSave}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            disabled={loading || !newArticle.imageUrl}
          >
            {loading ? "Записва се..." : newArticle.title ? "Запази" : "Добави"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Blog;