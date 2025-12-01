import { Card, Box, Stack, Typography, IconButton, Collapse, Tooltip } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { deepPurple, blueGrey } from '@mui/material/colors';
import { useEffect, useRef, useState } from "react"
import { useColorScheme } from '@mui/material/styles';
import ClassCard from './ClassCard.jsx';

const CourseCard = ({ course }) => {
    const [open, setOpen] = useState(false);
    const scheme = useColorScheme();
    const courseClassRef = useRef(null);

    useEffect(() => {
        if (open && courseClassRef.current) {
            // wait for Collapse animation to finish
            setTimeout(() => {
                courseClassRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 200); // match Collapse transition duration
        }
    }, [open]);

    return (
        <Box>
            <Card
                variant='outlined'
                sx={{
                    mb: 2, mx: 'auto', width: { sx: '100%', md: '50%' }, display: 'flex', flexDirection: 'row', p: 0,
                }}
            >
                <Box sx={{
                    bgcolor: scheme.colorScheme === 'dark' ? deepPurple[900] : deepPurple[200],
                    width: '33.33%', p: 2, m: 0
                }}
                >
                    <Stack>
                        <Typography variant='caption' color='text.secondary' sx={{ fontSize: '0.7rem' }}>
                            COURSE
                        </Typography>
                        <Typography variant='subtitle1' sx={{ fontWeight: 300 }}>
                            {course.courseName}
                        </Typography>
                    </Stack>

                </Box>
                <Box sx={{
                    flex: 1,
                    bgcolor: scheme.colorScheme === 'dark' ? blueGrey[900] : blueGrey[200],
                    p: 2,
                    ml: -2,
                    display: 'flex',
                    flexDirection: 'column',
                    position: "relative",
                    overflow: "hidden" // important
                }}>
                    <Box sx={{ flex: 1, minHeight: 180 }}>
                        <Typography variant='body1'>
                            {course.description}
                        </Typography>
                    </Box>
                    <Box sx={{
                        mt: "auto",
                        display: "flex",
                        justifyContent: "flex-end"
                    }}>
                        <Tooltip title={open ? 'Hide Classes' : 'Show Classes'} enterDelay={500} leaveDelay={200}>
                            <IconButton
                                onClick={() => setOpen(!open)}
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: 15,
                                }}>
                                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </Tooltip>
                    </Box>

                </Box>
            </Card>
            <Collapse in={open} timeout='auto' unmountOnExit sx={{ mb: 3 }}>
                <Box ref={courseClassRef}>
                    {course.classes.map(cl => (
                        <ClassCard key={cl._id} cls={cl} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    )
}

export default CourseCard