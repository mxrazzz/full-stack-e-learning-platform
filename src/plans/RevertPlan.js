import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CourseCard from "./CourseCardPlan"; // Adjust the import path as necessary
import logoImage from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
