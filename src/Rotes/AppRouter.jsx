// src/Rotes/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- PAGINA COLABORADOR --- \\
import Home from '../Pages/Home/home.jsx'; // Link pagina principal
import AboutPage from "../Pages/SobreNos/AboutPage.jsx"; // Link pagina Sobre nós
import Entretenimento from '../Pages/Entretenimento/entretenimento'; // Link pagina Entretenimento
import Graficos from '../Pages/Graficos/grafico.jsx'; // Link pagina dos gráficos
import Cardapio from '../Pages/Cardapio/cardapio'; // Link pagina dos cardapios

// --- ADMIN --- \\
import CardapioPage from "../Pages/AdminSection/CardapioPage.jsx"; // Link pagina dos cardapios do admin
import AvisosPage from "../Pages/AdminSection/AvisosPage.jsx"; // Link pagina avisos admin
import FeedBackPage from "../Pages/AdminSection/FeedBackPage.jsx"; // Link pagina Feedback do admin

// --- JOGOS --- \\

// FLAPPY CHICKEN \\
import FlappyChickenTelaInicial from "../Pages/FlappyChicken/FlappyChicken.jsx"
import CenarioChapeu from "../Pages/FlappyChicken/Cenarios/FlappyChickenChapeu.jsx"
import CenarioGrill from "../Pages/FlappyChicken/Cenarios/FlappyChickenGrill.jsx";
import CenarioClube from "../Pages/FlappyChicken/Cenarios/FlappyChickenClube.jsx";




const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre-nos" element={<AboutPage />} />
      <Route path="/entretenimento" element={<Entretenimento />} />
      <Route path="/graficos" element={<Graficos />} />
      <Route path="/cardapio" element={<Cardapio />} />
      
      <Route path="/admin/cardapio" element={<CardapioPage />} />
      <Route path="/admin/avisos" element={<AvisosPage />} />
      <Route path="/admin/feedbacks" element={<FeedBackPage />} />

      <Route path="/entretenimento/flappybird/tela_inicial" element={<FlappyChickenTelaInicial />} />
      <Route path="/entretenimento/flappybird/tela_inicial/chapeu" element={<CenarioChapeu />} />
      <Route path="/entretenimento/flappybird/tela_inicial/grill" element={<CenarioGrill />} />
      <Route path="/entretenimento/flappybird/tela_inicial/clube" element={<CenarioClube />} />

    </Routes>
  </Router>
);

export default AppRouter;

