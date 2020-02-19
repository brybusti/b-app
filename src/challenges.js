import React, { useState} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RandomGrid from './Grid.js';
import jsonDictionary  from './full-wordlist.json';
import solutions from './boggle_solver.js';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LoginButton from './LoginButton.js';
import { FixedSizeList } from 'react-window';
import TextInput from './TextInput.js';
import {db} from './firebase';


